import React, { useState } from 'react';
import LockIcon from '@material-ui/icons/LockOutlined';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  withStyles,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Avatar,
  TextField,
  Typography
} from '@material-ui/core';

import { useAuthenticationForm, authenticationFormActions } from './useAuthenticationForm';
import history from '../_utils/history';
import routes from '../_constants/routesConstants';
import { landingStyles } from './styles';
import { showSuccessToast } from '../_utils/toast';

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password)
  }
`;

const LoginPage = ({ classes }) => {
  const [staySigned, setStaySigned] = useState(true);
  const [form, dispatch] = useAuthenticationForm();

  const login = useMutation(LOGIN_MUTATION, {
    variables: { userName: form.userName.value, password: form.password.value },
    update: (store, { data: { login } }) => {
      if (login) {
        store.writeData({ data: { isAuthenticated: true } });
      }
    }
  });

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Prihlásenie
        </Typography>
        <Typography
          paragraph={false}
          gutterBottom={true}
          variant="subtitle2"
          className={classes.error}
        >
          {form.errors.authentication}
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
                type: authenticationFormActions.SET_FIELD,
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
                type: authenticationFormActions.SET_FIELD,
                payload: { field: 'password', value: e.target.value }
              })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={staySigned}
                onChange={e => {
                  setStaySigned(e.target.checked);
                }}
                color="primary"
                disabled={form.isAuthenticating}
              />
            }
            label="Zostať prihlasený"
          />
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOnSubmit}
            disabled={form.isAuthenticating}
          >
            Prihlásiť
          </Button>
        </form>
        <Button
          className={classes.register}
          onClick={e => {
            e.preventDefault();
            history.push(routes.REGISTER);
          }}
        >
          Registrovať
        </Button>
      </Paper>
    </main>
  );

  function handleOnSubmit(e) {
    e.preventDefault();

    if (form.isValid) {
      dispatch({ type: authenticationFormActions.LOGIN_REQUEST });
      login()
        .then(res => {
          if (staySigned) {
            window.localStorage.setItem('X-JWT', res.data.login);
          } else {
            window.sessionStorage.setItem('X-JWT', res.data.login);
          }

          dispatch({
            type: authenticationFormActions.LOGIN_SUCCESS,
            payload: { jwt: res.data.login }
          });

          history.push('/');
          showSuccessToast('Prihlásenie úspešné');
        })
        .catch(resErr => {
          console.log(resErr);
          dispatch({
            type: authenticationFormActions.LOGIN_ERROR,
            payload: { error: resErr.graphQLErrors[0].message }
          });
        });
    }
  }
};

export default withStyles(landingStyles)(LoginPage);
