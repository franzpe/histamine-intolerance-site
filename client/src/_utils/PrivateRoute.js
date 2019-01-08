import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from '_constants/routesConstants';
import history from '_utils/history';
import { useQuery } from 'react-apollo-hooks';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';

function PrivateRoute(props) {
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: routes.LOGIN, state: { target: history.location } }} />
  );
}
export default PrivateRoute;
