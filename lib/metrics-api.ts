import { Construct } from "constructs";

import * as ddb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as api from "aws-cdk-lib/aws-apigateway";
import * as cm from "aws-cdk-lib/aws-certificatemanager";

export interface MetricsApiProps {
  aggregateTable: ddb.Table;
  metricsTable: ddb.Table;
  certificate: cm.Certificate;
}

export class MetricsApi extends Construct {
  constructor(scope: Construct, id: string, props: MetricsApiProps) {
    super(scope, id);

    const metricsLambda = new lambda.Function(this, "MetricsLambda", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("lambda"),
      handler: "metrics.handler",
      environment: {
        QUERY_TABLE: props.metricsTable.tableName,
        AGGREGATE_TABLE: props.aggregateTable.tableName,
      },
    });

    props.metricsTable.grantReadData(metricsLambda);
    props.aggregateTable.grantReadData(metricsLambda);

    const metricsEndpoint = new api.LambdaRestApi(this, "MetricsApi", {
      endpointExportName: "MetricsApi",
      handler: metricsLambda,
      proxy: false,
    });

    //make sure api requests have origin headers, to make sure request is from a browser
    const apiValidation = new api.LambdaIntegration(metricsLambda);

    const metrics = metricsEndpoint.root.addResource("metrics");
    metrics.addMethod("GET", apiValidation, {
      requestParameters: {
        "method.request.header.origin": true,
      },
      requestValidatorOptions: {
        requestValidatorName: "metric-validator",
        validateRequestParameters: true,
      },
    });
  }
}
