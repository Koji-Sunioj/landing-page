import { Construct } from "constructs";

import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as aws_route53 from "aws-cdk-lib/aws-route53";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cm from "aws-cdk-lib/aws-certificatemanager";
import * as deployment from "aws-cdk-lib/aws-s3-deployment";
import * as origin from "aws-cdk-lib/aws-cloudfront-origins";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as lambda_event from "aws-cdk-lib/aws-lambda-event-sources";
import * as ddb from "aws-cdk-lib/aws-dynamodb";

import * as event from "aws-cdk-lib/aws-events";
import * as eventTarget from "aws-cdk-lib/aws-events-targets";
import * as iam from "aws-cdk-lib/aws-iam";

export class IronpondStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //certification
    //1. declare domain name and hosted zone
    const domainName = "ironpond.net";
    const hostedZone = aws_route53.HostedZone.fromLookup(
      this,
      "website-hosted-zone",
      { domainName }
    );

    //2. create certification from DNS of hosted zone and domain name
    const certificate = new cm.Certificate(this, "CustomDomainCertificate", {
      domainName: domainName,
      validation: cm.CertificateValidation.fromDns(hostedZone),
    });

    //3. print out the arn for the issued certificate, sanity check
    const certificateArn = certificate.certificateArn;
    new cdk.CfnOutput(this, "CertificateArn", {
      value: certificateArn,
    });

    //bucket deployment
    //1. instantiate the bucket for the deployment
    const appBucket = new s3.Bucket(this, "LandingBucket", {
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

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

    //.2 grant bucket read access to the distribution
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    appBucket.grantRead(originAccessIdentity);

    //.3 create distribution
    const distribution = new cloudfront.Distribution(
      this,
      "LandingDistribution",
      {
        logBucket: logBucket,
        enableLogging: true,
        domainNames: [domainName],
        certificate: certificate,
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: new origin.S3Origin(appBucket, { originAccessIdentity }),
        },
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
        ],
      }
    );

    //.4 create a https pointer to the cloudfront distribution
    new aws_route53.ARecord(this, "website-record", {
      ttl: cdk.Duration.minutes(1),
      zone: hostedZone,
      target: aws_route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    //.5 parse the build with bucket
    new deployment.BucketDeployment(this, "LandingDeployment", {
      sources: [
        deployment.Source.asset(path.resolve(__dirname, "../website/build")),
      ],
      cacheControl: [
        deployment.CacheControl.fromString("max-age=3000,public,immutable"),
      ],
      destinationBucket: appBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
