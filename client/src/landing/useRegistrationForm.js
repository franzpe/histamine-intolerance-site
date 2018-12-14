import { useReducer } from 'react';

import * as validator from './validator';

export const registrationFormActions = {
  SET_FIELD: 'SET_FIELD',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  VALIDATE: 'VALIDATE'
};

const initialState = {
  userName: { value: '' },
  password: { value: '' },
  confirmPassword: { value: '' },
  errors: {},
  isRegistering: false,
  isRegistered: false,
  isValid: false
};

export function useRegistrationForm(initialFormState = initialState) {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  return [state, dispatch];

  function reducer(prevState, action) {
    switch (action.type) {
      case registrationFormActions.SET_FIELD: {
        return withValidationErrors(action.payload.field, {
          ...prevState,
          [action.payload.field]: { value: action.payload.value }
        });
      }
      case registrationFormActions.REGISTER_REQUEST: {
        return { ...prevState, isRegistering: true };
      }
      case registrationFormActions.REGISTER_SUCCESS: {
        return { ...prevState, isRegistering: false, isRegistered: true };
      }
      case registrationFormActions.REGISTER_ERROR: {
        return {
          ...prevState,
          isRegistering: false,
          errors: { registration: action.payload.error }
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

  if (field === 'confirmPassword') {
    const confirmPasswordError = validator.validateConfirmPassword(
      state.confirmPassword.value,
      state.password.value
    );
    if (confirmPasswordError) {
      errors = { ...errors, confirmPassword: confirmPasswordError };
    }
  }

  return errors;
}
