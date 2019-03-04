import gql from 'graphql-tag';
import jwt from './jwt';

export const ME_QUERY = gql`
  {
    me {
      userName
      role {
        id
      }
    }
  }
`;

export const verifyUser = client => {
  client
    .query({ query: ME_QUERY })
    .then(res => {
      client.writeData({
        data: {
          isAuthenticated: true,
          isAuthenticating: false,
          user: {
            __typename: 'UserClient',
            userName: res.data.me.userName,
            role: res.data.me.role.id
          }
        }
      });
    })
    .catch(() => {
      jwt.removeAll();
      client.writeData({ data: { isAuthenticating: false } });
    });
};
