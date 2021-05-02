const dotenv = require("dotenv-flow");
const { generate } = require("@graphql-codegen/cli");

dotenv.config({
  node_env: process.argv[2] || process.env.NODE_ENV || "production",
});

console.log(
  `REACT_APP_GRAPHQL_ENDPOINT ${process.env.REACT_APP_GRAPHQL_ENDPOINT}`
);
console.log(`REACT_APP_API_KEY ${process.env.REACT_APP_API_KEY}`);

generate(
  {
    schema: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    headers: `x-api-key: ${process.env.REACT_APP_API_KEY}`,
    generates: {
      ["./src/graphql-client/types.d.ts"]: {
        plugins: ["typescript"],
        config: {
          skipTypename: true,
          declarationKind: "interface",
          maybeValue: "T | null | undefined",
          enumsAsTypes: true,
          noExport: true,
        },
      },
      ["./src/graphql-client/introspection-result.json"]: {
        plugins: ["fragment-matcher"],
      },
    },
    hooks: {
      afterAllFileWrite: ["prettier --write"],
    },
  },
  true
);
