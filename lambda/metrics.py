import json
import os
import boto3
from utils.utils import (serialize_int, return_headers)
dynamodb = boto3.resource('dynamodb')


def handler(event, context):
    response = {"headers": return_headers, 'statusCode': 200, 'body': {}}
    print(event)
    try:
        metrics_table = dynamodb.Table(os.environ['QUERY_TABLE'])
        metrics = metrics_table.scan()
        response["body"] = json.dumps(
            {"metrics": metrics["Items"]}, default=serialize_int)

    except Exception as error:
        response["statusCode"] = 400
        response["body"] = json.dumps({"message": str(error)})

    return response
