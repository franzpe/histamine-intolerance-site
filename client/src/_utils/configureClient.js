import ApolloClient from 'apollo-boost';
import initialState from '../_state/index.js';
import mutation from '../_mutations';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  clientState: {
    defaults: initialState,
    resolvers: {
      Mutation: mutation
    }
  }
});

export default client;
