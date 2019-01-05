const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const validateUserName = userName => {
  let error = '';

  if (!userName) {
    error = 'Email je povinný';
  } else if (!emailRegex.test(userName)) {
    error = 'Zlý formát emailu';
  }

  return error;
};

export const validatePassword = password => {
  let error = '';

  if (!password) {
    error = 'Heslo je povinné';
  } else if (password.length < 6) {
    error = 'Heslo musí mať aspoň 6 znakov';
  }

  return error;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  let error = '';
  if (!confirmPassword) {
    error = 'Potvrdenie hesla je povinné';
  } else if (confirmPassword !== password) {
    error = 'Heslo sa nezhoduje';
  }
  return error;
};
