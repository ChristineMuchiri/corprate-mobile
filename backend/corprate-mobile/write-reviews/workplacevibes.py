import os
import json
import uuid
import boto3  # type: ignore
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME', 'CorprateMobileTable'))

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', "{}"))

        company_name = body.get('companyName')
        selected_attributes = body.get('selectedAttributes', [])
        dress_code = body.get('dressCode')
        free_response = body.get('freeResponse', '')

        if not company_name or not dress_code:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields: companyName and dressCode'})
            }
        
        # unique review ID
        review_id = str(uuid.uuid4())

        # PK/SK design
        PK = f"COMPANY#{company_name.upper()}"
        SK = f"REVIEW#WORKPLACEVIBES{review_id}"

        # Put item in DynamoDB
        table.put_item(
            Item={
                'PK': PK,
                'SK': SK,
                'companyName': company_name,
                'selectedAttributes': selected_attributes,
                'dressCode': dress_code,
                'freeResponse': free_response,
                'reviewType': 'WorlkplaceVibes',
                'createdAt': datetime.utcnow().isoformat(),
                "FeedPK": "FEED",
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'workplace vibes Review submitted successfully', 
                                'reviewId': review_id})
        }
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'})
        }