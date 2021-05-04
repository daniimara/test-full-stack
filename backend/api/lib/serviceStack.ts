import * as sst from "@serverless-stack/resources";

export default class ServiceStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create the HTTP API
    const restApi = new sst.Api(this, "Api", {
      routes: {
        "GET /location/{query}": "src/location/getLocation.handler",
      },
    });

    // Show API endpoint in output
    this.addOutputs({
      ApiEndpoint: restApi.url,
    });
  }
}
