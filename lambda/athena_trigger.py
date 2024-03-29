import os
import boto3
import json
import numpy as np
import time
from datetime import datetime
import pandas as pd
import gzip
s3 = boto3.client('s3')
ddb = boto3.resource('dynamodb')


def handler(event, context):
    print(event)
    key = event["Records"][0]["s3"]["object"]["key"]
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    principal = event["Records"][0]["userIdentity"]["principalId"]

    # checking if athena created a new csv file from query
    if "csv" in key and "metadata" not in key:
        # initialize tables
        query_table = ddb.Table(os.environ['QUERY_TABLE'])
        country_table = ddb.Table(os.environ['COUNTRY_TABLE'])

        # grab the locations from the json file
        locations = pd.read_json(
            "./utils/edge_iata_iso.json").T.reset_index().rename(columns={"index": "location"})

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
        bot_string = "(?i)curl|python|apache-http|go-http|webtech|-|insomnia|google|msnbot|wget|ioncrawl|java|xpanse|zoom|screaming|crawler"
        without_bot = with_date[with_date['user_agent'].str.contains(
            bot_string) == False]

        # make a list for visits, merge the location frame and make list for country hits
        visits = without_bot.groupby(without_bot.index).aggregate({"load": "mean"}).reset_index(
        ).round(0).astype({"load": "int"}).rename(columns={"visit": "time"}).to_dict("records")
        with_countries = pd.merge(without_bot, locations, on="location", how="left").drop(
            columns=["user_agent", "location"])
        countries = with_countries.groupby("country").aggregate(
            {"load": "sum"})

        to_put = {"visits": visits, "countries": countries.reset_index().to_dict("records"), "server_load": without_bot.load.sum().item(),
                  "query_date": int(query_date[0]), "query_id": context.aws_request_id}

        metrics = query_table.scan(
            ProjectionExpression="query_id,query_date,server_load")

        to_put_copy = to_put.copy()
        del to_put_copy["visits"]
        del to_put_copy["countries"]
        metrics["Items"].append(to_put_copy)

        monthly = pd.DataFrame(metrics["Items"]).drop(
            columns=["query_id"]).astype(int).set_index("query_date")
        monthly.index = pd.to_datetime(monthly.index, unit="s")
        monthly_average = monthly.resample(
            "m").aggregate({"server_load": "sum"})
        monthly_average.index = monthly_average.index.astype(str)
        monthly_average = monthly_average.reset_index().to_dict(orient="records")

        query_table.put_item(Item=to_put)

        # aggregate old values with new
        country_aggregate = country_table.get_item(
            Key={"aggregate": "countries"})
        old_countries = pd.DataFrame.from_dict(
            country_aggregate["Item"]["countries"], orient="index", columns=["load"])
        old_countries["load"] = old_countries.load.values.astype(int)
        old_countries.index.name = "country"
        new_frame = pd.concat([old_countries, countries])
        final_countries = new_frame.groupby(
            new_frame.index).aggregate({"load": "sum"}).to_dict()["load"]
        added_countries = {"aggregate": "countries",
                           "countries": final_countries}

        metrics_dict = {"countries": final_countries,
                        "monthly": monthly_average}
        json_dict = json.dumps(metrics_dict)
        s3.put_object(Bucket=bucket, Body=json_dict,
                      Key="app_data/metrics.json", ACL="public-read")

        country_table.put_item(Item=added_countries)
