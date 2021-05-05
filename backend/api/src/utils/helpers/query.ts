import { DynamoDB } from "aws-sdk";

export const generateExpressionAttribute = (
  map: User
): {
  ExpressionAttributeNames: DynamoDB.DocumentClient.ExpressionAttributeNameMap;
  ExpressionAttributeValues: DynamoDB.DocumentClient.ExpressionAttributeValueMap;
  UpdateExpression: string;
} => {
  let updateExpression = "";
  const values: { [name: string]: string } = {};
  const names: { [name: string]: string } = {};

  let prefix = "SET ";
  const attributes = Object.keys(map);
  for (let i = 0; i < attributes.length; i++) {
    const attribute: string = attributes[i];
    if (attribute !== "id") {
      updateExpression += prefix + "#" + attribute + " = :" + attribute;
      values[":" + attribute] = map[attribute as keyof User] ?? "";
      names["#" + attribute] = attribute;
      prefix = ", ";
    }
  }

  return {
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values,
    UpdateExpression: updateExpression,
  };
};
