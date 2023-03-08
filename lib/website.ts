import * as aws_route53 from "aws-cdk-lib/aws-route53";
import * as cm from "aws-cdk-lib/aws-certificatemanager";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as deployment from "aws-cdk-lib/aws-s3-deployment";
import * as origin from "aws-cdk-lib/aws-cloudfront-origins";
import * as targets from "aws-cdk-lib/aws-route53-targets";

import { Construct } from "constructs";

export interface WebsiteProps {
  logBucket: s3.Bucket;
}

export class WebSite extends Construct {
  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    const domainName = "ironpond.net";
    const hostedZone = aws_route53.HostedZone.fromLookup(
      this,
      "website-hosted-zone",
      { domainName }
    );

    const certificate = new cm.Certificate(this, "CustomDomainCertificate", {
      domainName: domainName,
      validation: cm.CertificateValidation.fromDns(hostedZone),
    });

    const appBucket = new s3.Bucket(this, "LandingBucket", {
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    appBucket.grantRead(originAccessIdentity);

    const distribution = new cloudfront.Distribution(
      this,
      "LandingDistribution",
      {
        logBucket: props.logBucket,
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

    // .4 create a https pointer to the cloudfront distribution
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
