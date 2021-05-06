import { DynamoDB } from "aws-sdk";
import { sanitizeError } from "../utils/helpers/response";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getUserById(userId: string): Promise<User> {
  const params = {
    Key: { id: userId },
    TableName: process.env.USERS_TABLE as string,
  };

  try {
    const { Item } = await dynamoDb.get(params).promise();
    if (Item) {
      return Item as User;
    } else {
      throw 404;
    }
  } catch (error) {
    throw new Error(sanitizeError(JSON.stringify(error)));
  }
}
