import * as path from 'path';

import {RemovalPolicy, Stack} from 'aws-cdk-lib';
import {BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment';
import {BlockPublicAccess, Bucket, BucketEncryption} from 'aws-cdk-lib/aws-s3';

import {Construct} from 'constructs';
import {BaseStackProps} from '../interface';


export class S3Stack extends Stack {
    readonly sourceS3Bucket: Bucket;

    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        this.sourceS3Bucket = new Bucket(this, `${props.stackName}SourceS3Bucket`, {
            bucketName: `source-s3-bucket-${this.account}-${this.region}`,
            versioned: false,
            encryption: BucketEncryption.S3_MANAGED,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true
        });

        new BucketDeployment(this, 'SourceS3BucketDeployData', {
            sources: [Source.asset(path.join(__dirname, '../..', 'data'))],
            destinationBucket: this.sourceS3Bucket,
            retainOnDelete: false
        });


        new Bucket(this, `${props.stackName}QueryS3Bucket`, {
            bucketName: `query-s3-bucket-${this.account}-${this.region}`,
            versioned: false,
            encryption: BucketEncryption.S3_MANAGED,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true
        });
    }
}