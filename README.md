# Notes from Koji

my landing page infrastructure with static website using s3, cloudfront with custom domain in route 53. note that the layer would note appear in github. needs to be bootstrapped after cdk is deployed via:

```
mkdir -p layer/python/lib/python3.8/site-packages/
pip install --target=layer/python/lib/python3.8/site-packages/ pandas
```

backend now includes the ability to create metrics on website load throughout the day and count of countries (through AWS edge locations) athena query is saved in s3. i have not found a reliable way to bootstrap the athena database with glue reliably through the CDK, so for now it is done through console.

cloudfront logs are now expiring after 3 days.

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
