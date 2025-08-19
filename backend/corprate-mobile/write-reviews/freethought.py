import os
import json
import uuid
from datetime import datetime, timezone
import boto3 # type: ignore

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME','CorprateMobileTable'))

def lambda_handler(event, context):
    try:
        body = json.loads(event["body"])

        user_id = body.get("userId", "anonymous")  # replace with Cognito if you add auth
        text = body.get("text")
        image_url = body.get("imageUrl")
        gif_url = body.get("gifUrl")

        if not text and not image_url and not gif_url:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Post must contain text, image, or gif"})
            }

        item_id = str(uuid.uuid4())
        created_at = datetime.now(timezone.utc).isoformat()

        item = {
            "PK": f"USER#{user_id}",
            "SK": f"FREETHOUGHT#{item_id}",
            "FeedPK": "FEED",
            "createdAt": created_at,
            "ReviewType": "FreeThought",
            "Text": text,
        }

        if image_url:
            item["ImageUrl"] = image_url
        if gif_url:
            item["GifUrl"] = gif_url

        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Free thought posted!", "id": item_id})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
