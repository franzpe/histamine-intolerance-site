import React from 'react';
import FaceIcon from '@material-ui/icons/Face';
import { landingStyles } from './styles';
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
import { useRegistrationForm, registrationFormActions } from './useRegistrationForm';

const RegisterPage = ({ classes }) => {
  const [form, dispatch] = useRegistrationForm();

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrácia
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
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOnSubmit}
            disabled={form.isAuthenticating}
          >
            Registrovať
          </Button>
        </form>
      </Paper>
    </main>
  );

  function handleOnSubmit(e) {
    e.preventDefault();
    if (form.isValid) {
      // TODO REGISTER
    }
  }
};

export default withStyles(landingStyles)(RegisterPage);
