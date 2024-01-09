import boto3
import json
import logging
from custom_encoder import CustomEncoder
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodbTableName = "question-db"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(dynamodbTableName)

getMethod = "GET"
postMethod = "POST"
patchMethod = "PATCH"
deleteMethod = "DELETE"
healthPath = "/health"
questionPath = "/question"
questionsPath = "/questions"


def lambda_handler(event, context):
    logger.info(event)
    httpMethod = event["httpMethod"]
    path = event["path"]
    
    if httpMethod == getMethod and path == healthPath:
        response = buildResponse(200, "Connection is OK")
        
    elif httpMethod == getMethod and path == questionsPath:
        response = getQuestions()
        
    elif httpMethod == postMethod and path == questionsPath:
        #loop to save all questions
        response = saveQuestion()
        
    elif httpMethod == getMethod and path == questionPath:
        response = getQuestion(event["queryStringParameters"]["questionId"])
        
    elif httpMethod == postMethod and path == questionPath:
        response = saveQuestion(json.loads(event["body"]))
        
    elif httpMethod == patchMethod and path == questionPath:
        requestBody = json.loads(event["body"])
        response = modifyQuestion(requestBody["questionId"], requestBody["updateKey"], requestBody["updateValue"])
        
    elif httpMethod == deleteMethod and path == questionPath:
        requestBody = json.loads(event["body"])
        response = deleteQuestion(requestBody["questionId"])
        
    else:
        response = buildResponse(404, "Not Found")
        
    return response

def getQuestion(questionId):
    try:
        response = table.get_item(
            Key={
                "questionId": questionId
            }
        )
        if "Item" in response:
            return buildResponse(200, response["Item"])
        else:
            return buildResponse(404, {"Message": "QuestionId: {0}s not found".format(questionId)})
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def getQuestions():
    try:
        response = table.scan()
        result = response["Items"]

        while "LastEvaluateKey" in response:
            response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
            result.extend(response["Items"])

        body = {
            "questions": response
        }
        return buildResponse(200, body)
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def saveQuestion(requestBody):
    try:
        name = requestBody["name"]
        response = parse_question(requestBody["question"])
        
        table.put_item(Item={
            "question_id": name,
            "question_type": "1",
            "question": response
        })
        body = {
            "Operation": "SAVE",
            "Message": "SUCCESS",
            "question_id": name,
            "question": response
        }
        return buildResponse(200, body)
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def modifyQuestion(questionId, updateKey, updateValue):
    try:
        response = table.update_item(
            Key={
                "questionId": questionId
            },

            UpdateExpression="set {0}s = :value".format(updateKey),
            ExpressionAttributeValues={
                ":value": updateValue
            },
            ReturnValues="UPDATED_NEW"
        )
        body = {
            "Operation": "UPDATE",
            "Message": "SUCCESS",
            "UpdatedAttributes": response
        }
        return buildResponse(200, body)
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")

def deleteQuestion(questionId):
    try:
        response = table.delete_item(
            Key={
                "questionId": questionId
            },
            ReturnValues="ALL_OLD"
        )
        body = {
            "Operation": "DELETE",
            "Message": "SUCCESS",
            "deltedItem": response
        }
        return buildResponse(200, body)
    except:
        logger.exception("Do your custom error handling here. I am just gonna log it our here!!")


def buildResponse(statusCode, body=None):
    response = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    if body is not None:
        response["body"] = json.dumps(body, cls=CustomEncoder)
    return response
    
def parse_question(question):
    question_parts = question.split("-")
    question_text = question_parts[0] #Separate the question from the answer
    answers = question_parts[1:]
    
    # # Find the correct answer
    # correct_answer = None
    # for i, answer in enumerate(answers):
    #     if answer.startswith("*"):
    #         correct_answer = answer[1:] # Remove the asterisk *
    #         answers[i] = correct_answer
    #         break
    
    return question_text, answers