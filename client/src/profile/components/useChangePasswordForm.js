import { useReducer } from 'react';

import * as validator from '_utils/validator';

export const changePasswordFormActions = {
  SET_FIELD: 'SET_FIELD'
};

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  errors: {},
  isValid: false
};

export function useChangePasswordForm(initialFormState = initialState) {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  return [state, dispatch];

  function reducer(prevState, action) {
    switch (action.type) {
      case changePasswordFormActions.SET_FIELD: {
        return withValidationErrors(action.payload.field, {
          ...prevState,
          [action.payload.field]: action.payload.value
        });
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

  if (field === 'oldPassword') {
    const oldPasswordError = !state.oldPassword ? 'Heslo je povinny udaj' : '';
    if (oldPasswordError) {
      errors = { ...errors, oldPassword: oldPasswordError };
    }
  }

  if (field === 'newPassword') {
    const newPasswordError = validator.validatePassword(state.newPassword);
    if (newPasswordError) {
      errors = { ...errors, newPassword: newPasswordError };
    }
  }

  if (field === 'confirmPassword') {
    const confirmPasswordError = validator.validateConfirmPassword(
      state.confirmPassword,
      state.newPassword
    );
    if (confirmPasswordError) {
      errors = { ...errors, confirmPassword: confirmPasswordError };
    }
  }

  return errors;
}
