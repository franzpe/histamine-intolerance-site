import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import qs from 'qs';
import gql from 'graphql-tag';

import history from '_utils/history';
import { showErrorToast, showSuccessToast } from '_utils/toast';
import { ME_QUERY } from '_utils/verifyUser';
import { client } from 'index';

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation facebookLogin($code: String!) {
    facebookLogin(code: $code)
  }
`;

function FacebookLogin() {
  const facebookLogin = useMutation(FACEBOOK_LOGIN_MUTATION);

  const code = qs.parse(history.location.search.slice(1)).code;

  facebookLogin({ variables: { code } })
    .then(async ({ data: { facebookLogin } }) => {
      if (facebookLogin) {
        window.localStorage.setItem('X-JWT', facebookLogin);
        const {
          data: { me }
        } = await client.query({ query: ME_QUERY });

        client.writeData({
          data: {
            isAuthenticating: false,
            isAuthenticated: true,
            user: { __typename: 'UserClient', userName: me.userName, role: me.role.id }
          }
        });

        showSuccessToast('Prihlásenie úspešné');
        history.push('/');
      }
    })
    .catch(() => showErrorToast('Prihlásenie nebolo úspešné. Prosím skúste znovu'));

  return <div />;
}

export default FacebookLogin;
