import os
import boto3
import numpy as np
import time
from datetime import datetime
import pandas as pd
s3 = boto3.client('s3')
ddb = boto3.resource('dynamodb')


def handler(event, context):
    key = event["Records"][0]["s3"]["object"]["key"]
    bucket = event["Records"][0]["s3"]["bucket"]["name"]

    if "csv" in key and "metadata" not in key:
        locations = pd.read_json(
            "./utils/locations.json").reset_index().rename(columns={"index": "location"})
        locations["country"] = [i["country"] for i in locations.nodes]
        locations = locations.drop(columns=["source", "self", "nodes"])

        saved_query = s3.get_object(Bucket=bucket, Key=key)
        raw_frame = pd.read_csv(saved_query["Body"])

        with_date = raw_frame.set_index(pd.to_datetime(
            raw_frame.visit).astype(np.int64) // 10**9).drop(columns="visit")
        with_date.location = with_date.location.str[:3].values
        bot_string = "(?i)curl|python|apache-http|go-http|webtech|-"
        without_bot = with_date[with_date['user_agent'].str.contains(
            bot_string) == False]

        visits = without_bot.groupby(without_bot.index).aggregate({"load": "mean"}).reset_index(
        ).round(0).astype({"load": "int"}).rename(columns={"visit": "time"}).to_dict("records")
        with_countries = pd.merge(with_date, locations, on="location", how="left").drop(
            columns=["user_agent", "location", "load"])
        countries = with_countries.groupby("country").aggregate(
            {"requests": "sum"}).reset_index().to_dict("records")

        date = int(time.mktime(datetime.utcnow().replace(
            hour=0, minute=0, second=0, microsecond=0).timetuple()))

        to_put = {"visits": visits, "countries": countries,
                  "date": date, "query_id": context.aws_request_id}
        query_table = ddb.Table(os.environ['QUERY_TABLE'])
        query_table.put_item(Item=to_put)
