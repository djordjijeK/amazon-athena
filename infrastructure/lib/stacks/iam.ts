import {Stack} from 'aws-cdk-lib';
import {ManagedPolicy, Role, ServicePrincipal} from 'aws-cdk-lib/aws-iam';

import {Construct} from 'constructs';
import {BaseStackProps} from '../interface';


export class IamStack extends Stack {
    readonly glueRole: Role;

    constructor(scope: Construct, id: string, props: BaseStackProps) {
        super(scope, id, props);

        this.glueRole = new Role(this, `${props.stackName}GlueRole`, {
            roleName: `GlueRole`,
            assumedBy: new ServicePrincipal('glue.amazonaws.com'),
            description: 'Allows glue crawler to access to S3 buckets',
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('AWSGlueConsoleFullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSGlueServiceRole'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonAthenaFullAccess'),
            ]
        });
    }
}