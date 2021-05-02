# Documentation

### Features

- [x] The search functionality performs real time filtering on client side data and API side data
- [x] List of users is updated automatically after single user is updated
- [x] Modal has been created from scratch
- [x] Appear/Disappear of modal should be animated
- [x] Infinite loading state is being saved in url query ((eg ?page=1)

### Framework

- React - Function-Component, Hooks
- react-router
- Apollo - graphql client
- Jest
- react-testing-library (test renderer)

### Structure

- `/`
- `/build` # output after build
- `/coverage` # jest test code coverage report
- `/public` # static / config
- `/src`
  - `/components` # pure components, can not access apollo data directly
  - `/config` # shared config properties
  - `/containers` # connected components, can access apollo data
  - `/graphql-client` # Apollo client, graphql queries and fragments
  - `/hooks` # custom react hooks
  - `/icons` # shared icons
  - `/pages` # connected components, can access redux data, most are the routers
  - `/resources` # shared resources
  - `/testUtils` # utils specific to testing
  - `/styles` # shared theme properties
  - `/utils` # common method
  - `/index.tsx` # the main entry
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
REACT_APP_GRAPHQL_ENDPOINT=https://6myhngsf2vdyfet6m5dq7sapvq.appsync-api.us-east-1.amazonaws.com/graphql
REACT_APP_API_KEY=da2-kxnklhduznc2dc33qtmpjwxtni
REACT_APP_MAP_BOX_ACCESS_TOKEN=pk.eyJ1IjoiZGFuaWltYXJhIiwiYSI6ImNrbnplajM0MzA0OHUyb2xiMWoxcDhhNWkifQ.3J9Ii2iQ6SYSw2vgsItxng
REACT_APP_API_URL=https://8qk05urh03.execute-api.us-east-1.amazonaws.com
REACT_APP_LOCATION_API=location
```

#### React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Commands

In the project directory, you can run:

##### `start`

```js
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```js
npm run test
```

```js
npm run test:watch
```

```js
npm run test:coverage
```

##### `build`


```js
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `eject`

```js
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### TODO:

#### graphql:gen

It should generate types based on the graphql schema. Needs to be run anytime the grahpql schema is updated at the backend.

```js
npm run graphql:gen
```

#### Code Splitting

Configure React app to make use of [code splitting](https://webpack.js.org/guides/code-splitting) by default. When building the app for production, the code can be output in several chunks:

```sh
$ ls build/static/js
2.5b77f553.chunk.js
2.5b77f553.chunk.js.map
main.cff1a559.chunk.js
main.cff1a559.chunk.js.map
runtime~main.a8a9905a.js
runtime~main.a8a9905a.js.map
```

Loading chunks only when they are required can improve the app performance significantly.

#### React.lazy

Use React.lazy for components in order to improve performance and build a better experience for users.

#### Storybook

Provide components in Storybook with tests.

#### Tests

- Increase test coverage.
- Use typescript settings instead of javascript

#### UI

- Define breakpoints and improve UI CSS.