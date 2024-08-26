## Amazon Athena

This project shows how to set up and use Amazon Athena with AWS Glue for querying data stored in S3. 
The project uses AWS CDK to automate the setup of necessary AWS infrastructure. 
After deploying the infrastructure, you can execute SQL queries in Amazon Athena to explore and analyze your data.


- Define AWS environment (in `infrastructure/config.ts`)

    ```
    export const ACCOUNT_ID = 'xxxxxxxxxxxx';
    export const REGION = 'aws-region';
    ```
  
- Deploy infrastructure

    ```
    $ cdk bootstrap && cdk-deploy --all
    ```


- Go to AWS Glue &#8594; Crawlers &#8594; GlueSourceCrawler &#8594; Run crawler


- Go to Athena &#8594; Settings &#8594; Manage &#8594; choose query s3 bucket as `query-s3-bucket...`


- Execute the sample queries from the `athena.sql` file