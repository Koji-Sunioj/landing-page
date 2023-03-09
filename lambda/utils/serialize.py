from decimal import Decimal


def serialize_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)
