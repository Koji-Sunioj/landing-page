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
import * as event from "aws-cdk-lib/aws-events";
import * as eventTarget from "aws-cdk-lib/aws-events-targets";
import { Duration } from "aws-cdk-lib";

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

    const logBucket = new s3.Bucket(this, "LogBucket", {
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      publicReadAccess: false,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(3),
        },
      ],
    });

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
