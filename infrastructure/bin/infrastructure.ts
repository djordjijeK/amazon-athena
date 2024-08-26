#!/usr/bin/env node
import {App, Environment} from 'aws-cdk-lib';

import {S3Stack} from '../lib/stacks/s3';
import {IamStack} from '../lib/stacks/iam';
import {GlueStack} from '../lib/stacks/glue';
import {ACCOUNT_ID, REGION} from '../lib/config';


const app = new App();

const environment: Environment = {
    account: ACCOUNT_ID,
    region: REGION
}


const iamStack = new IamStack(app, 'IamStack', {
    env: environment,
    stackName: 'IamStack'
});


const s3Stack = new S3Stack(app, 'S3Stack', {
    env: environment,
    stackName: 'S3Stack'
});


new GlueStack(app, 'GlueStack', {
    env: environment,
    stackName: 'GlueStack',
    glueRoleArn: iamStack.glueRole.roleArn,
    sourceS3BucketName: s3Stack.sourceS3Bucket.bucketName
});