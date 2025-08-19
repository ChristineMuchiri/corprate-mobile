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
        role = body.get('role')
        process_rounds = body.get('processRounds')
        process_duration = body.get('processDuration')
        selected_types = body.get('selectedTypes', [])
        difficulty = body.get('difficulty')
        questions = body.get('questions', '')
        prep_tips = body.get('prepTips', '')
        outcome = body.get('outcome', '')

        # Validate required fields
        if not company_name or not role or not difficulty:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields: companyName, role, difficulty'})
            }

        # unique review ID
        review_id = str(uuid.uuid4())

        # PK/SK design
        PK = f"COMPANY#{company_name.upper()}"
        SK = f"REVIEW#INTERVIEW#{review_id}"

        # Put item in DynamoDB
        table.put_item(
            Item={
                'PK': PK,
                'SK': SK,
                'companyName': company_name,
                'role': role,
                'reviewType': 'InterviewExperience',
                'processRounds': process_rounds,
                'processDuration': process_duration,
                'selectedTypes': selected_types,
                'difficulty': int(difficulty),
                'questions': questions,
                'prepTips': prep_tips,
                'outcome': outcome,
                'createdAt': datetime.utcnow().isoformat(),
                "FeedPK": "FEED",
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Interview Experience submitted successfully',
                'reviewId': review_id
            })
        }

    except Exception as e:
        print(f"Error processing InterviewExperience request: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'})
        }
