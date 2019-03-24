import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { CookiesProvider } from 'react-cookie';

import * as serviceWorker from './_utils/serviceWorker';
import configureClient from './_utils/configureClient';
import history from './_utils/history';
import routes from './_constants/routesConstants';
import { verifyUser } from './_utils/verifyUser';
import ToastInit from '_components/ToastInit';

import './index.scss';
import Head from '_components/Head';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '4px 24px 4px 24px'
      }
    }
  }
});

const Login = lazy(() => import(/* webpackChunkName: "Login" */ './landing/LoginPage'));
const Register = lazy(() => import(/* webpackChunkName: "Register" */ './landing/RegisterPage'));
const FacebookLogin = lazy(() =>
  import(/* webpackChunkName: "FacebookLogin" */ './landing/FacebookLogin')
);

const App = lazy(() => import(/* webpackChunkName: "App" */ './App'));

export const client = configureClient();
verifyUser(client);

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CookiesProvider>
          <Router history={history}>
            <Suspense fallback={<div />}>
              <CssBaseline>
                <Head />
                <ToastInit />
                <Switch>
                  <Route exact={true} path={routes.LOGIN} component={Login} />
                  <Route exact={true} path={routes.REGISTER} component={Register} />
                  <Route exact={true} path="/facebook-callback" component={FacebookLogin} />
                  <Route component={App} />
                </Switch>
              </CssBaseline>
            </Suspense>
          </Router>
        </CookiesProvider>
      </MuiThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
