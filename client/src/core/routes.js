import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../_constants/routesConstants';
import LoginPage from '../landing/LoginPage';
import RegisterPage from '../landing/RegisterPage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={() => <div>root</div>} />
        <Route exact={true} path={routes.LOGIN} component={LoginPage} />
        <Route exact={true} path={routes.REGISTER} component={RegisterPage} />
      </Switch>
    );
  }
}

export default Routes;
