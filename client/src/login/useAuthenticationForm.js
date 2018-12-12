import { useReducer } from 'react';

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const authenticationFormActions = {
  SET_FIELD: 'SET_FIELD',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR'
};

export function useAuthenticationForm(initialFormState = initialFormState) {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  return [state, dispatch];

  function reducer(prevState, action) {
    switch (action.type) {
      case authenticationFormActions.SET_FIELD: {
        return withValidationErrors({
          ...prevState,
          [action.payload.field]: { value: action.payload.value }
        });
      }
      case authenticationFormActions.LOGIN_REQUEST: {
        return { ...prevState, isAuthenticating: true };
      }
      case authenticationFormActions.LOGIN_SUCCESS: {
        return { ...prevState, isAuthenticating: false };
      }
      case authenticationFormActions.LOGIN_ERROR: {
        return {
          ...prevState,
          isAuthenticating: false,
          errors: { authentication: action.payload.error }
        };
      }
      default:
        return prevState;
    }
  }

  function withValidationErrors(nextState) {
    return { ...nextState, errors: validateUser(nextState) };
  }
}

function validateUser(state) {
  let errors = {};

  if (!emailRegex.test(state.userName.value)) {
    errors = { ...errors, userName: 'user name is inavalid' };
  }

  if (state.password.value.length < 3) {
    errors = { ...errors, password: 'password needs to have atleast 8 characters' };
  }

  return errors;
}
