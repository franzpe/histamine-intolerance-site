import ApolloClient from 'apollo-boost';
import initialState from '../_state/index.js';
import mutation from '../_mutations';
import jwt from './jwt.js';

function configureClient() {
  let authHeader;
  const token = jwt.get();
  authHeader = token ? `Bearer ${token}` : undefined;

  return new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    headers: {
      ...(authHeader && { authorization: authHeader })
    },
    clientState: {
      defaults: initialState,
      resolvers: {
        Mutation: { ...mutation }
      }
    }
  });
}

export default configureClient();
