#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { IronpondStack } from "../lib/ironpond-stack";

const app = new cdk.App();
new IronpondStack(app, "IronpondStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  },
});
