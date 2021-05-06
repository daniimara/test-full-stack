import { DynamoDB } from "aws-sdk";
import { sanitizeError } from "../utils/helpers/response";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function listAllUsers(): Promise<User[]> {
  const params = {
    TableName: process.env.USERS_TABLE as string,
  };

  try {
    const { Items } = await dynamoDb.scan(params).promise();
    return Items as User[];
  } catch (error) {
    throw new Error(sanitizeError(JSON.stringify(error)));
  }
}
