import {Stack} from 'aws-cdk-lib';
import {CfnCrawler, CfnDatabase} from 'aws-cdk-lib/aws-glue';

import {Construct} from 'constructs';
import {GlueStackProps} from '../interface';


export class GlueStack extends Stack {
    constructor(scope: Construct, id: string, props: GlueStackProps) {
        super(scope, id, props);

        const sourceDatabase = 'source-database';

        new CfnDatabase(this, `${props.stackName}GlueDatabase`, {
            catalogId: this.account,
            databaseInput: {
                name: sourceDatabase
            }
        });

        new CfnCrawler(this, `${props.stackName}GlueCrawler`, {
            name: `GlueSourceCrawler`,
            role: props.glueRoleArn,
            databaseName: sourceDatabase,
            targets: {
                s3Targets: [
                    {
                        path: `s3://${props.sourceS3BucketName}/`,
                    },
                ],
            },
            recrawlPolicy: {
                recrawlBehavior: 'CRAWL_EVERYTHING'
            }
        });
    }
}