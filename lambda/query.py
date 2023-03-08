import boto3
import os
import gzip
client = boto3.client("athena")


def lambda_handler(event, context):
    response = client.get_named_query(
        NamedQueryId='e0c773dc-edcc-45fe-8809-25d23a922fcd'
    )
    query_string = response["NamedQuery"]["QueryString"]
    client.start_query_execution(
        QueryString=query_string,
        QueryExecutionContext={
            'Database': 'default',
        },
        ResultConfiguration={
            'OutputLocation': 's3://%s/results/' % (os.environ['BUCKET'])
        },
        WorkGroup='primary',
    )
