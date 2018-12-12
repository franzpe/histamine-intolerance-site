import React, { useState } from 'react';
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
import LockIcon from '@material-ui/icons/LockOutlined';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { red } from '@material-ui/core/colors';

import { useAuthenticationForm, authenticationFormActions } from './useAuthenticationForm';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  authError: {
    color: red[500]
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.light
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password)
  }
`;

const LoginPage = ({ classes }) => {
  const [staySigned, setStaySigned] = useState(false);
  const [form, dispatch] = useAuthenticationForm({
    userName: { value: '' },
    password: { value: '' },
    errors: {},
    isAuthenticating: false
  });

  const login = useMutation(LOGIN_MUTATION, {
    variables: { userName: form.userName.value, password: form.password.value }
  });

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography
          paragraph={false}
          gutterBottom={true}
          variant="subtitle2"
          className={classes.authError}
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
                value={staySigned.toString()}
                onChange={e => setStaySigned(e.target.checked)}
                color="primary"
                disabled={form.isAuthenticating}
              />
            }
            label="Zostat prihlaseny"
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
            Prihlasit
          </Button>
        </form>
      </Paper>
    </main>
  );

  function handleOnSubmit(e) {
    e.preventDefault();

    dispatch({ type: authenticationFormActions.LOGIN_REQUEST });
    login()
      .then(res => {
        if (form.staySigned) {
          window.localStorage.setItem('X-JWT', res.data.login);
        } else {
          window.sessionStorage.setItem('X-JWT', res.data.login);
        }
        dispatch({
          type: authenticationFormActions.LOGIN_SUCCESS,
          payload: { jwt: res.data.login }
        });
      })
      .catch(resErr =>
        dispatch({
          type: authenticationFormActions.LOGIN_ERROR,
          payload: { error: resErr.graphQLErrors[0].message }
        })
      );
  }
};

export default withStyles(styles)(LoginPage);
