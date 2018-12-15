const removeAll = () => {
  const localJWT = window.localStorage.getItem('X-JWT');
  if (localJWT) {
    window.localStorage.removeItem('X-JWT');
  }

  const sessionJWT = window.sessionStorage.getItem('X-JWT');
  if (sessionJWT) {
    window.sessionStorage.removeItem('X-JWT');
  }
};

const get = () => {
  let jwt;
  const localJwt = window.localStorage.getItem('X-JWT');
  if (localJwt) {
    jwt = localJwt;
  } else {
    const sessionJwt = window.sessionStorage.getItem('X-JWT');
    if (sessionJwt) {
      jwt = sessionJwt;
    }
  }
  return jwt;
};

const jwt = { removeAll, get };

export default jwt;
