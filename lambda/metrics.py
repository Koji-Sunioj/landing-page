import json
import os
import boto3
from utils.serialize import serialize_int
dynamodb = boto3.resource('dynamodb')


def handler(event, context):
    metrics_table = dynamodb.Table(os.environ['QUERY_TABLE'])
    metrics = metrics_table.scan()
    print(metrics)

    return {
        'statusCode': 200,
        'body': json.dumps({"metrics": metrics}, default=serialize_int)
    }
