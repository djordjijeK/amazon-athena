import {Environment, StackProps} from 'aws-cdk-lib';


export interface BaseStackProps extends StackProps {
    readonly env: Environment
    readonly stackName: string
}


export interface GlueStackProps extends StackProps {
    readonly glueRoleArn: string
    readonly sourceS3BucketName: string
}