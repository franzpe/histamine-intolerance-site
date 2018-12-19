import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import qs from 'qs';
import gql from 'graphql-tag';

import history from '_utils/history';
import { showErrorToast, showSuccessToast } from '_utils/toast';

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation facebookLogin($code: String!) {
    facebookLogin(code: $code)
  }
`;

function FacebookLogin() {
  const facebookLogin = useMutation(FACEBOOK_LOGIN_MUTATION, {
    update: (store, _) => {
      store.writeData({ data: { isAuthenticated: true } });
    }
  });

  const code = qs.parse(history.location.search.slice(1)).code;

  facebookLogin({ variables: { code } })
    .then(({ data: { facebookLogin } }) => {
      window.localStorage.setItem('X-JWT', facebookLogin);
      showSuccessToast('Prihlásenie úspešné');
      history.push('/');
    })
    .catch(() => showErrorToast('Prihlásenie nebolo úspešné. Prosím skúste znovu'));

  return <div />;
}

export default FacebookLogin;
