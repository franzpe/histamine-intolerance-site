import React from 'react';
import FaceIcon from '@material-ui/icons/Face';
import { withStyles, Button, Paper, Avatar, TextField, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

import { landingStyles } from './styles';
import { useRegistrationForm, registrationFormActions } from './useRegistrationForm';
import history from '../_utils/history';
import routes from '../_constants/routesConstants';

const SIGNUP_MUTATION = gql`
  mutation signup($userName: String!, $password: String!) {
    signup(userName: $userName, password: $password)
  }
`;

const RegisterPage = ({ classes }) => {
  const [form, dispatch] = useRegistrationForm();
  const signup = useMutation(SIGNUP_MUTATION, {
    variables: { userName: form.userName.value, password: form.password.value }
  });

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrácia
        </Typography>
        <Typography
          paragraph={false}
          gutterBottom={true}
          variant="subtitle2"
          className={form.isRegistered ? classes.success : classes.error}
        >
          {form.isRegistered ? 'Registration successful. Please log in.' : form.errors.registration}
        </Typography>
        <form className={classes.form}>
          <TextField
            id="userName"
            name="userName"
            required={true}
            fullWidth={true}
            margin="normal"
            type="email"
            label="Email"
            value={form.userName.value}
            error={!!form.errors.userName}
            helperText={form.errors && form.errors.userName}
            disabled={form.isAuthenticating}
            onChange={e =>
              dispatch({
                type: registrationFormActions.SET_FIELD,
                payload: { field: 'userName', value: e.target.value }
              })
            }
          />
          <TextField
            id="password"
            name="password"
            required={true}
            fullWidth={true}
            margin="normal"
            type="password"
            label="Heslo"
            value={form.password.value}
            error={!!form.errors.password}
            helperText={form.errors && form.errors.password}
            disabled={form.isAuthenticating}
            onChange={e =>
              dispatch({
                type: registrationFormActions.SET_FIELD,
                payload: { field: 'password', value: e.target.value }
              })
            }
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            required={true}
            fullWidth={true}
            margin="normal"
            type="password"
            label="Potvrdenie hesla"
            value={form.confirmPassword.value}
            error={!!form.errors.confirmPassword}
            helperText={form.errors && form.errors.confirmPassword}
            disabled={form.isAuthenticating}
            onChange={e =>
              dispatch({
                type: registrationFormActions.SET_FIELD,
                payload: { field: 'confirmPassword', value: e.target.value }
              })
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOnSubmit}
            disabled={form.isAuthenticating}
          >
            Registrovať
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.back}
            onClick={e => {
              e.preventDefault();
              history.push(routes.LOGIN);
            }}
            disabled={form.isAuthenticating}
          >
            Späť
          </Button>
        </form>
      </Paper>
    </main>
  );

  function handleOnSubmit(e) {
    e.preventDefault();

    dispatch({ type: registrationFormActions.REGISTER_REQUEST });
    if (form.isValid) {
      dispatch({ type: registrationFormActions.REGISTER_SUCCESS });
      signup()
        .then(() => {
          setTimeout(() => history.push(routes.LOGIN), 1500);
        })
        .catch(resErr =>
          dispatch({
            type: registrationFormActions.REGISTER_ERROR,
            payload: { error: resErr.graphQLErrors[0].message }
          })
        );
    }
  }
};

export default withStyles(landingStyles)(RegisterPage);
