import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from '_constants/routesConstants';
import history from '_utils/history';
import { useQuery } from 'react-apollo-hooks';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import { USER_ROLE } from '_constants/commonConstants';

function PrivateRoute({ admin, ...restProps }) {
  const {
    isAuthenticated,
    isAuthenticating,
    user: { role }
  } = useQuery(AUTHENTICATION_QUERY).data;

  if (!isAuthenticating) {
    return isAuthenticated && (!admin || role === USER_ROLE.ADMIN) ? (
      <Route {...restProps} />
    ) : (
      <Redirect to={{ pathname: routes.LOGIN, state: { target: history.location } }} />
    );
  } else {
    return null;
  }
}
export default PrivateRoute;
