#!/usr/bin/python3.8
import urllib3
import os
import json
http = urllib3.PoolManager()

def lambda_handler(event, context):
    url = os.environ['teamsURL']
    # teams webhooks use connector cards:
    # https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#office-365-connector-card
    msg = {
        "text": event['Records'][0]['Sns']['Message']
    }
    encoded_msg = json.dumps(msg).encode('utf-8')
    resp = http.request('POST',url, body=encoded_msg)
