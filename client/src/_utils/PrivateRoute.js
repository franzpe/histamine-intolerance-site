import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { routes } from '_constants/routesConstants';
import history from '_utils/history';

class PrivateRoute extends React.Component {
  render() {
    return this.props.isAuthenticated ? (
      <Route {...this.props} />
    ) : (
      <Redirect to={{ pathname: routes.LOGIN, state: { target: history.location } }} />
    );
  }
}

export default PrivateRoute;
