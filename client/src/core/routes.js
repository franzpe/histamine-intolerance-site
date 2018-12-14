import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../_constants/routesConstants';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../landing/LoginPage'));
const Register = lazy(() => import(/* webpackChunkName: "Register" */ '../landing/RegisterPage'));

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact={true} path="/" component={() => <div>root</div>} />
          <Route exact={true} path={routes.LOGIN} component={Login} />
          <Route exact={true} path={routes.REGISTER} component={Register} />
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
