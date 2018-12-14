import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from 'react-router-dom';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import App from './App';
import * as serviceWorker from './_utils/serviceWorker';
import client from './_utils/configureClient';
import history from './_utils/history';
import './index.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Router history={history}>
            <App />
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
