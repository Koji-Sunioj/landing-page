import os
import boto3
import numpy as np
import time
from datetime import datetime
import pandas as pd
import gzip
s3 = boto3.client('s3')
ddb = boto3.resource('dynamodb')


def handler(event, context):
    key = event["Records"][0]["s3"]["object"]["key"]
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    principal = event["Records"][0]["userIdentity"]["principalId"]

    # checking if athena created a new csv file from query
    if "csv" in key and "metadata" not in key:
        # grab the locations from the json file
        locations = pd.read_json(
            "./utils/locations.json").reset_index().rename(columns={"index": "location"})
        locations["country"] = [i["country"] for i in locations.nodes]
        locations = locations.drop(columns=["source", "self", "nodes"])

        # grab the csv file saved by athena
        saved_query = s3.get_object(Bucket=bucket, Key=key)
        raw_frame = pd.read_csv(saved_query["Body"])

        # data cleaning of bots and creating unix timestamps
        with_date = raw_frame.set_index(pd.to_datetime(
            raw_frame.visit)).drop(columns="visit")
        query_date = pd.to_datetime(with_date.index.floor(
            freq='D').unique()).astype(int) / 10**9
        with_date.index = with_date.index.astype(np.int64) // 10**9
        with_date.location = with_date.location.str[:3].values
        bot_string = "(?i)curl|python|apache-http|go-http|webtech|-"
        without_bot = with_date[with_date['user_agent'].str.contains(
            bot_string) == False]

        # make a list for visits, merge the location frame and make list for country hits
        visits = without_bot.groupby(without_bot.index).aggregate({"load": "mean"}).reset_index(
        ).round(0).astype({"load": "int"}).rename(columns={"visit": "time"}).to_dict("records")
        with_countries = pd.merge(without_bot, locations, on="location", how="left").drop(
            columns=["user_agent", "location", "load"])
        countries = with_countries.groupby("country").aggregate(
            {"requests": "sum"}).reset_index().to_dict("records")

        # store in ddb
        to_put = {"visits": visits, "countries": countries,
                  "date": int(query_date[0]), "query_id": context.aws_request_id}
        query_table = ddb.Table(os.environ['QUERY_TABLE'])
        query_table.put_item(Item=to_put)

    elif ".gz" in key and "TriggerLambda" not in principal and "datafeeds" in principal:
        # check if cloudfront made a log file, if so: wipe the client address from it
        obj = s3.get_object(Bucket=bucket, Key=key)
        strings = []
        with gzip.open(obj["Body"], 'r') as fin:
            content = fin.read().decode("utf-8").split("\n")
            for con in content:
                columns = con.split("\t")
                if len(columns) > 1:
                    columns[4] = "anon"
                filtered_line = "\t".join(columns)
                strings.append(filtered_line)

        fin.close()
        new_file = gzip.compress(bytes(("\n").join(strings), encoding='utf8'))
        s3.put_object(Body=new_file, Bucket=bucket, Key=key)
