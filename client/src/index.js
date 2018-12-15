import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import App from './App';
import * as serviceWorker from './_utils/serviceWorker';
import client from './_utils/configureClient';
import history from './_utils/history';
import routes from './_constants/routesConstants';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const Login = lazy(() => import(/* webpackChunkName: "Login" */ './landing/LoginPage'));
const Register = lazy(() => import(/* webpackChunkName: "Register" */ './landing/RegisterPage'));

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Router history={history}>
            <Suspense fallback={<div />}>
              <Switch>
                <Route exact={true} path={routes.LOGIN} component={Login} />
                <Route exact={true} path={routes.REGISTER} component={Register} />
                <Route component={App} />
              </Switch>
            </Suspense>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
