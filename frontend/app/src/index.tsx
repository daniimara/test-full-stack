import ReactDOM from "react-dom";
import "./styles/index.scss";
import { uniqBy } from "lodash";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./containers/App";
import Router from "./Router";
import { getGlobal } from "utils/getGlobal";

const env = getGlobal("_env");

const httpLink = createHttpLink({
  uri: env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-api-key": env.REACT_APP_API_KEY,
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listUsers: {
          keyArgs: ["id"],
          merge: (
            existing = { __typename: "UsersWithPaginationParams", items: [] },
            incoming
          ) => {
            if (incoming) {
              const newItemsList = {
                ...incoming,
                items: uniqBy([...incoming?.items], "__ref"),
              };
              return newItemsList;
            } else {
              return { ...existing };
            }
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App>
        <Router />
      </App>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById("spa-root"));
