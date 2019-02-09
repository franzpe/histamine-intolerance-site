export const FACEBOOK_APP_ID = 573120706492873;
export const GRAPHQL_API_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/graphql'
    : window.location.origin + '/graphql';
