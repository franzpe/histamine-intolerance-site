import gql from 'graphql-tag';
import jwt from './jwt';

const ME_QUERY = gql`
  {
    me {
      userName
    }
  }
`;

export const verifyUser = client => {
  client
    .query({ query: ME_QUERY })
    .then(() => client.writeData({ data: { isAuthenticated: true } }))
    .catch(() => {
      jwt.removeAll();
    });
};
