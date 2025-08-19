import json
import os
import uuid
import boto3  # type: ignore
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME', 'CorprateMobileTable'))

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', "{}"))

        company_name = body.get('companyName')
        pros = body.get('pros')
        cons = body.get('cons')
        advice = body.get('advice')
        
        if not company_name or not pros or not cons:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields'})
            }
        
        # unique review ID
        review_id = str(uuid.uuid4())

        # PK/SK design
        PK = f"COMPANY#{company_name.upper()}"
        SK = f"REVIEW#GENERALREVIEW{review_id}"

        # Put item in DynamoDB
        table.put_item(
            Item={
                'PK': PK,
                'SK': SK,
                'companyName': company_name,
                'pros': pros,
                'cons': cons,
                'advice': advice,
                'reviewType': 'GeneralReview',
                'createdAt': datetime.utcnow().isoformat(),
                "FeedPK": "FEED",
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'General Review submitted successfully', 
                                'reviewId': review_id})
        }
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'})
        }