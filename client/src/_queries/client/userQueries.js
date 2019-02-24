import gql from 'graphql-tag';

export const AUTHENTICATION_QUERY = gql`
  {
    isAuthenticated @client
    isAuthenticating @client
    user {
      userName
      role
    }
  }
`;
