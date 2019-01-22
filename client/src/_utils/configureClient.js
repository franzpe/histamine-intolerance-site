import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { withClientState } from 'apollo-link-state';
import { onError } from 'apollo-link-error';

import initialState from '_state/index.js';
import mutation from '_mutations';
import jwt from './jwt.js';
import { GRAPHQL_API_URI } from '_constants/apiConstants.js';

const authMiddleware = new ApolloLink((operation, forward) => {
  let authHeader;
  const token = jwt.get();
  authHeader = token ? `Bearer ${token}` : undefined;

  operation.setContext({
    headers: {
      ...(authHeader && { authorization: authHeader })
    }
  });

  return forward(operation);
});

const link = createUploadLink({ uri: GRAPHQL_API_URI });
const cache = new InMemoryCache();

function configureClient() {
  return new ApolloClient({
    link: ApolloLink.from([
      authMiddleware,
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      withClientState({
        defaults: initialState,
        resolvers: {
          Mutation: { ...mutation }
        },
        cache
      }),
      link
    ]),
    cache
  });
}

export default configureClient();
