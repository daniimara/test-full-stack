import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { sanitizeError } from "../utils/helpers/response";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function createUser(user: User): Promise<User> {
  const item: User = {
    ...user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidv4(),
  };

  const params = {
    Item: item,
    TableName: process.env.USERS_TABLE as string,
  };

  try {
    await dynamoDb.put(params).promise();
    return item;
  } catch (error) {
    throw new Error(sanitizeError(JSON.stringify(error)));
  }
}
