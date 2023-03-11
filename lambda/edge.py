import re


def handler(event, context):
    request = event['Records'][0]['cf']['request']
    agent = request["headers"]["user-agent"]
    agent_string = ", ".join([i["value"] for i in agent])
    print(agent_string)
    bot_string = "(?i)curl|python|apache-http|go-http|webtech|-|insomnia|java|expanse|zoom"
    is_matched = re.search(bot_string, agent_string)

    if is_matched:
        print("rejecting")
        reject_request = {"status": 403,
                          "statusDescription": 'no bots allowed'}
        return reject_request
    else:
        print("accepting")
        return request
