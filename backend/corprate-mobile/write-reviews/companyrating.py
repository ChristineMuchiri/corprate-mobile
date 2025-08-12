import json
import os
import uuid
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME','CorprateMobileTable'))

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', "{}"))

        company_name = body.get('companyName')
        overall_rating = body.get('overallRating')
        selected_mood = body.get('selectedMood')
        review_text = body.get('reviewText')
        
        if not company_name or not overall_rating:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields'})
            }
        # unique review ID
        review_id = str(uuid.uuid4())

        # PK/SK design
        PK = f"COMPANY#{company_name.upper()}"
        SK = f"REVIEW#COMPANYRATING{review_id}"

        # Put item in DynamoDB
        table.put_item(
            Item={
                'PK': PK,
                'SK': SK,
                'companyName': company_name,
                'overallRating': overall_rating,
                'selectedMood': selected_mood,
                'reviewText': review_text,
                'reviewType': 'CompanyRating',
                'createdAt': datetime.utcnow().isoformat(),
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Company Rating submitted  successfully', 
            'reviewId': review_id})
        }
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }