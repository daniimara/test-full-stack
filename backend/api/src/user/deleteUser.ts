import { DynamoDB } from "aws-sdk";
import { sanitizeError } from "../utils/helpers/response";
import getUserById from "./getUserById";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function deleteUser(userId: string): Promise<string> {
  const params = {
    Key: { id: userId },
    TableName: process.env.USERS_TABLE as string,
  };

  try {
    const user = await getUserById(userId);
    if (user) {
      await dynamoDb.delete(params).promise();
      return userId;
    } else {
      throw 404;
    }
  } catch (error) {
    throw new Error(sanitizeError(JSON.stringify(error)));
  }
}
