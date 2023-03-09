import { Construct } from "constructs";

import * as ddb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as api from "aws-cdk-lib/aws-apigateway";

export interface MetricsApiProps {
  metricsTable: ddb.Table;
}

export class MetricsApi extends Construct {
  constructor(scope: Construct, id: string, props: MetricsApiProps) {
    super(scope, id);

    const metricsLambda = new lambda.Function(this, "MetricsLambda", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("lambda"),
      handler: "metrics.handler",
      environment: { QUERY_TABLE: props.metricsTable.tableName },
    });

    props.metricsTable.grantReadData(metricsLambda);

    const metricsEndpoint = new api.LambdaRestApi(this, "MetricsApi", {
      endpointExportName: "MetricsApi",
      handler: metricsLambda,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: api.Cors.ALL_ORIGINS,
      },
    });

    const metrics = metricsEndpoint.root.addResource("metrics");
    metrics.addMethod("GET");
  }
}
