import React from 'react';

import { ReactComponent as FacebookSvg } from '_assets/facebook_icon.svg';
import { FACEBOOK_APP_ID } from '_constants/apiConstants';

function FacebookLoginBtn({ className }) {
  const redirectUrl = `${document.location.protocol}//${document.location.host}/facebook-callback`;

  return (
    <FacebookSvg
      className={className}
      onClick={handleFacebookLogin}
      alt="Prihlasenie cez Facebook"
    />
  );

  function handleFacebookLogin(e) {
    window.location = `https://www.facebook.com/v2.9/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}`;
  }
}

export default FacebookLoginBtn;
