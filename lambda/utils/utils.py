from decimal import Decimal


def serialize_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)


return_headers = {
    "Access-Control-Allow-Origin": "https://ironpond.net",
    "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Origin",
        "Access-Control-Allow-Methods": "GET"
}
