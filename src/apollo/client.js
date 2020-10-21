import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { split } from "apollo-link";
import { setContext } from "@apollo/client/link/context";

import { Socket as PhoenixSocket } from "phoenix";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { hasSubscription } from "@jumpn/utils-graphql";

import config from "../../config";

const httpLink = createHttpLink({
  uri: config.url,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: config.token ? `Bearer ${config.token}` : "",
    },
  };
});

const authedHttpLink = authLink.concat(httpLink);

const phoenixSocket = new PhoenixSocket(config.ws, {
  params: {
    token: config.token,
  },
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);

const websocketLink = createAbsintheSocketLink(absintheSocket);

const link = split(
  (operation) => hasSubscription(operation.query),
  websocketLink,
  authedHttpLink
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
