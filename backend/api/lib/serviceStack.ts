import * as sst from "@serverless-stack/resources";
import * as ddb from "@aws-cdk/aws-dynamodb";

export default class ServiceStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a users table
    const usersTable = new sst.Table(this, "Users", {
      fields: {
        id: sst.TableFieldType.STRING,
        name: sst.TableFieldType.STRING,
        dob: sst.TableFieldType.STRING,
        address: sst.TableFieldType.STRING,
        description: sst.TableFieldType.STRING,
        createdAt: sst.TableFieldType.STRING,
        updatedAt: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "id" },
      dynamodbTable: {
        billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      },
    });

    // Create the AppSync GraphQL API
    const graphQLApi = new sst.AppSyncApi(this, "AppSyncApi", {
      graphqlApi: {
        schema: "graphql/schema.graphql",
      },
      defaultFunctionProps: {
        // Pass the table name to the function
        environment: {
          USERS_TABLE: usersTable.dynamodbTable.tableName,
        },
      },
      dataSources: {
        users: "src/user/main.handler",
      },
      resolvers: {
        "Query    listAllUsers": "users",
        "Query    getUserById": "users",
        "Query    getUserByName": "users",
        "Mutation createUser": "users",
        "Mutation updateUser": "users",
        "Mutation deleteUser": "users",
      },
    });

    // Enable the AppSync API to access the DynamoDB table
    graphQLApi.attachPermissions([usersTable]);

    // Create the HTTP API
    const restApi = new sst.Api(this, "Api", {
      routes: {
        "GET /location/{query}": "src/location/getLocation.handler",
      },
    });

    // Show API endpoint in output
    this.addOutputs({
      ApiId: graphQLApi.graphqlApi.apiId,
      GraphqlUrl: graphQLApi.graphqlApi.graphqlUrl,
      ApiKey: graphQLApi.graphqlApi.apiKey ?? "",
      ApiEndpoint: restApi.url,
    });
  }
}
