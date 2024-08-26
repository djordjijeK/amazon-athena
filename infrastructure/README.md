# Infrastructure

- Define AWS environment (in `config.ts`)

    ```
    export const ACCOUNT_ID = 'xxxxxxxxxxxx';
    export const REGION = 'aws-region';
    ```

- Deploy infrastructure

    ```
    $ cdk bootstrap && cdk-deploy --all
    ```


