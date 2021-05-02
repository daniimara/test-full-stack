# Documentation

### Features

- [x] The API follow typical GraphQL API design pattern
- [x] The data is saved in the DB
- [x] Proper error handling is used
- [x] Paginating and filtering (by name) users list

### Architecture

- AppSyncApi
- GraphQL
- Lambda Functions
- DynamoDB

Please see the [ARCHITECTURE.md](./docs/ARCHITECTURE.md) doc for more information.
### Framework

- Serverless Stack
- aws-cdk

### Structure

- `/`
- `/.build` # output after build
- `/coverage` # jest test code coverage report
- `/graphql` # graphql schema
- `/lib`
    - `/index.tsx` # the main entry
    - `...` # settings for services stack
- `/src`
  - `/location` # lambda function to retrieve coordinates
  - `/resources` # shared resources
  - `/user` # lambda function to retrieve user data
  - `/utils` # common method
    - `/helpers` # shared method
    - `/test` # utils specific to testing
- `...`

### Usage

use `npm` or `yarn` command

#### Install

Start by installing the dependencies.
After update any dependency, you have to run `install` again

```js
npm install
```

Create a `.env` file in the root directory. 
This file is not checked in.

```
MAP_BOX_URL=https://api.mapbox.com/geocoding/v5/mapbox.places
MAP_BOX_ACCESS_TOKEN=pk.eyJ1IjoiZGFuaWltYXJhIiwiYSI6ImNrbnplajM0MzA0OHUyb2xiMWoxcDhhNWkifQ.3J9Ii2iQ6SYSw2vgsItxng
```

#### Serverless Stack (SST)

This project was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack).

#### Available Scripts

In the project directory, you can run:

##### `start`

Starts the local Lambda development environment.

```js
npm run start
```

##### `build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

```js
npm run build
```

##### `deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

```js
npm run deploy [stack]
```

##### `remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

```js
npm run remove [stack]
```

##### `test`

Runs the tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

```js
npm run test
```

```js
npm run test:watch
```

```js
npm run test:coverage
```

#### Learn More

Learn more about the Serverless Stack.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)

##### Community

[Twitter](https://twitter.com/ServerlessStack) or [forums](https://discourse.serverless-stack.com).

### TODO:

#### Environment variables

Move environment variables to AWS Systems Manager Parameter Store or another tool.
#### Tests

- Increase test coverage.
- Use typescript settings instead of javascript

#### CI/CD

Use a CI/CD tool, ex.: Travis CI, Jenkins

#### Logs

Use an online tool, ex.: Sumo Logic, Apollo Studio