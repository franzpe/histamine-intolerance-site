import { useReducer } from 'react';
import * as validator from '_utils/validator';

export const authenticationFormActions = {
  SET_FIELD: 'SET_FIELD',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR'
};

const initialState = {
  userName: { value: '' },
  password: { value: '' },
  errors: {},
  isAuthenticating: false,
  isValid: false
};

export function useAuthenticationForm(initialFormState = initialState) {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  return [state, dispatch];

  function reducer(prevState, action) {
    switch (action.type) {
      case authenticationFormActions.SET_FIELD: {
        return withValidationErrors(action.payload.field, {
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

  function withValidationErrors(field, nextState) {
    const errors = validate(field, nextState);
    return { ...nextState, errors, isValid: Object.keys(errors).length === 0 };
  }
}

function validate(field, state) {
  delete state.errors[field];
  let errors = state.errors;

  if (field === 'userName') {
    const userNameError = validator.validateUserName(state.userName.value);
    if (userNameError) {
      errors = { ...errors, userName: userNameError };
    }
  }

  if (field === 'password') {
    const passwordError = validator.validatePassword(state.password.value);
    if (passwordError) {
      errors = { ...errors, password: passwordError };
    }
  }

  return errors;
}
