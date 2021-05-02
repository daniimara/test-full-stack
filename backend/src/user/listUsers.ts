import { DynamoDB } from "aws-sdk";
import { sanitizeError } from "../utils/helpers/response";

const dynamoDb = new DynamoDB.DocumentClient();

interface Params {
  TableName: string;
  Limit: number;
  ExclusiveStartKey?: { id: string };
}

export default async function listUsers(
  input: ListUsersInput
): Promise<UsersWithPaginationParams> {
  const { pageSize, exclusiveStartKey } = input;

  const params: Params = {
    TableName: process.env.USERS_TABLE as string,
    Limit: pageSize,
  };

  if (exclusiveStartKey) {
    const [, id] = /{id=(.*)}/gi.exec(
      exclusiveStartKey as string
    ) as RegExpExecArray;
    params.ExclusiveStartKey = { id };
  }

  try {
    const { Items, LastEvaluatedKey } = await dynamoDb.scan(params).promise();
    return {
      items: Items as User[],
      exclusiveStartKey: LastEvaluatedKey,
    };
  } catch (error) {
    throw new Error(sanitizeError(JSON.stringify(error)));
  }
}
