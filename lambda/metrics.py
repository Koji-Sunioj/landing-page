import json
import os
import boto3
import re
from utils.utils import (serialize_int, return_headers)
dynamodb = boto3.resource('dynamodb')


def handler(event, context):
    response = {"headers": return_headers, 'statusCode': 200, 'body': {}}
    print(event)
    try:
        user_agent = event["headers"]["User-Agent"]
        bot_string = "(?i)curl|python|apache-http|go-http|webtech|-|insomnia"
        is_matched = re.search(bot_string, user_agent)
        if is_matched:
            raise Exception("no bots allowed")
        else:
            metrics_table = dynamodb.Table(os.environ['QUERY_TABLE'])
            metrics = metrics_table.scan(
                ProjectionExpression="query_id,query_date,server_load,countries"
            )
            countries = {}
            for date_array in metrics["Items"]:
                for country in date_array["countries"]:
                    if country["country"] in countries:
                        countries[country["country"]] += country["load"]
                    else:
                        countries[country["country"]] = country["load"]

            new_metrics = [{k: metric[k] for k in set(
                list(metric.keys())) - set(["countries"])} for metric in metrics["Items"]]

            response["body"] = json.dumps(
                {"metrics": new_metrics, "countries": countries}, default=serialize_int)

    except Exception as error:
        response["statusCode"] = 400
        response["body"] = json.dumps({"message": str(error)})

    return response
