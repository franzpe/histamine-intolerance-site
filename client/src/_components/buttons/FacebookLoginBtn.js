import { FACEBOOK_APP_ID } from '_constants/apiConstants';

function FacebookLoginBtn({ render }) {
  const redirectUrl = `${document.location.protocol}//${document.location.host}/facebook-callback`;

  return render({ onClick: handleFacebookLogin });

  function handleFacebookLogin(e) {
    window.location = `https://www.facebook.com/v2.9/dialog/oauth?scope=email&client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}`;
  }
}

export default FacebookLoginBtn;
