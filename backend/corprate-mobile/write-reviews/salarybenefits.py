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
        jobTitle = body.get('jobTitle')
        yearsExperience = body.get('yearsExperience')
        monthlyPay = body.get('monthlyPay')
        comments = body.get('comments', '')
        benefits = body.get('benefits', {})

        if not company_name or not jobTitle or not yearsExperience or not monthlyPay:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields'})
            }
        
        # unique review ID
        review_id = str(uuid.uuid4())

        # PK/SK design
        PK = f"COMPANY#{company_name.upper()}"
        SK = f"REVIEW#SALARYBENEFITS{review_id}"

        # Put item in DynamoDB
        table.put_item(
            Item={
                'PK': PK,
                'SK': SK,
                'companyName': company_name,
                'jobTitle': jobTitle,
                'yearsExperience': yearsExperience,
                'monthlyPay': monthlyPay,
                'comments': comments,
                'benefits': benefits,
                'reviewType': 'SalaryBenefits',
                'createdAt': datetime.utcnow().isoformat(),
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