import { Construct } from "constructs";
import { WebSite } from "./website";

import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambda_event from "aws-cdk-lib/aws-lambda-event-sources";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import * as event from "aws-cdk-lib/aws-events";
import * as eventTarget from "aws-cdk-lib/aws-events-targets";
import * as iam from "aws-cdk-lib/aws-iam";

export class IronpondStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new ddb.Table(this, "MetricsTable", {
      partitionKey: { name: "query_id", type: ddb.AttributeType.STRING },
      sortKey: { name: "date", type: ddb.AttributeType.NUMBER },
    });

    const logBucket = new s3.Bucket(this, "LogBucket", {
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      publicReadAccess: false,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(3),
        },
      ],
    });

    new WebSite(this, "IronPond", {
      logBucket: logBucket,
    });

    const pandasLayer = new lambda.LayerVersion(this, "PandasLayer", {
      code: lambda.Code.fromAsset("layer"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_8],
    });

    const s3Trigger = new lambda.Function(this, "TriggerLambda", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("lambda"),
      handler: "s3trigger.handler",
      layers: [pandasLayer],
      environment: { QUERY_TABLE: table.tableName },
    });

    const queryFn = new lambda.Function(this, "QueryLambda", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("lambda"),
      handler: "query.handler",
      environment: { BUCKET: logBucket.bucketName },
    });

    queryFn.role?.attachInlinePolicy(
      new iam.Policy(this, "userpool-policy", {
        statements: [
          new iam.PolicyStatement({
            actions: [
              "athena:RunQuery",
              "athena:StartQueryExecution",
              "athena:GetNamedQuery",
            ],
            resources: ["*"],
          }),
        ],
      })
    );

    new event.Rule(this, "my-lambda-rule", {
      description: "Description of the rule",
      targets: [new eventTarget.LambdaFunction(queryFn)],
      schedule: event.Schedule.cron({ minute: "0", hour: "1" }),
    });

    logBucket.grantReadWrite(queryFn);
    logBucket.grantReadWrite(s3Trigger);
    table.grantWriteData(s3Trigger);

    const s3PutEventSource = new lambda_event.S3EventSource(logBucket, {
      events: [s3.EventType.OBJECT_CREATED_PUT],
    });

    s3Trigger.addEventSource(s3PutEventSource);
  }
}
