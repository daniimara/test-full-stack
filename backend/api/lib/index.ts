import ServiceStack from "./serviceStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime and env variables for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x",
    environment: {
      MAP_BOX_URL: process.env.MAP_BOX_URL ?? "",
      MAP_BOX_ACCESS_TOKEN: process.env.MAP_BOX_ACCESS_TOKEN ?? "",
    },
  });

  new ServiceStack(app, "service-stack");
}
