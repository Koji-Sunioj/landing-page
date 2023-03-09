import { Construct } from "constructs";

import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as aws_route53 from "aws-cdk-lib/aws-route53";
import * as cm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as deployment from "aws-cdk-lib/aws-s3-deployment";
import * as origin from "aws-cdk-lib/aws-cloudfront-origins";

export interface WebsiteProps {
  logBucket: s3.Bucket;
}

export class WebSite extends Construct {
  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    //1. register a hosted zone with the domain via DNS.
    //note the hosted zone ID in cdk.context.json matches the one in console
    const domainName = "ironpond.net";
    const hostedZone = aws_route53.HostedZone.fromLookup(
      this,
      "website-hosted-zone",
      { domainName }
    );

    //2. create a certifcate with the zone
    const certificate = new cm.Certificate(this, "CustomDomainCertificate", {
      domainName: domainName,
      validation: cm.CertificateValidation.fromDns(hostedZone),
    });

    //3. bucket for the static website
    const appBucket = new s3.Bucket(this, "LandingBucket", {
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    //4. grant access from bucket to cloudfront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    appBucket.grantRead(originAccessIdentity);

    //5. create a distrubtion in cloudfront with certificate, domain, bucket
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

    //6. create a record which points domain to distribution
    new aws_route53.ARecord(this, "website-record", {
      ttl: cdk.Duration.minutes(1),
      zone: hostedZone,
      target: aws_route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    //.7 parse the build with bucket
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
