import { DynamoDB } from "aws-sdk";
import { generateExpressionAttribute } from "../utils/helpers/query";
import { sanitizeError } from "../utils/helpers/response";
import getUserById from "./getUserById";

import { ID_NOT_FOUND_ERROR_RESPONSE_MESSAGE } from "../resources/messages-response.json";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function updateUser(user: User): Promise<User> {
  if (!user.id) {
    throw ID_NOT_FOUND_ERROR_RESPONSE_MESSAGE;
  }

  const item: User = {
    ...user,
    updatedAt: new Date().toISOString(),
  };

  const expressionAttribute = generateExpressionAttribute(item);

  const params = {
    Key: { id: user.id },
    ReturnValues: "UPDATED_NEW",
    UpdateExpression: expressionAttribute.UpdateExpression,
    TableName: process.env.USERS_TABLE as string,
    ExpressionAttributeNames: expressionAttribute.ExpressionAttributeNames,
    ExpressionAttributeValues: expressionAttribute.ExpressionAttributeValues,
  };

  try {
    await dynamoDb.update(params).promise();
    return await getUserById(user.id);
  } catch (error) {
    throw new Error(sanitizeError(JSON.stringify(error)));
  }
}
