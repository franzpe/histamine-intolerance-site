import React from 'react';
import { withStyles, Grid, TextField, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useChangePasswordForm, changePasswordFormActions } from './useChangePasswordForm';
import BackBtn from '_components/buttons/BackBtn';
import SaveBtn from '_components/buttons/SaveBtn';

const styles = theme => ({
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    width: '100%',
    textAlign: 'center'
  },
  container: {
    flex: 1
  },
  footer: {
    width: '100%',
    textAlign: 'right'
  },
  lGridPadding: {
    paddingLeft: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  rGridPadding: {
    paddingRight: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0
    }
  },
  row: {
    marginBottom: theme.spacing.unit * 2
  },
  btnMargin: {
    marginRight: theme.spacing.unit
  }
});

function ChangePasswordForm({ classes, toggleChangePasswordForm }) {
  const [form, dispatch] = useChangePasswordForm();

  return (
    <form className={classes.form}>
      <div className={classes.header}>
        <Typography variant="h6" component="h4" gutterBottom={true}>
          Change password
        </Typography>
      </div>
      <div className={classes.container}>
        <Grid container={true}>
          <Grid
            item={true}
            xs={12}
            sm={12}
            md={4}
            className={classNames(classes.row, classes.rGridPadding)}
          >
            <TextField
              name="oldPassword"
              label="Staré heslo"
              type="password"
              fullWidth={true}
              value={form.oldPassword}
              onChange={handleInputChange}
              error={!!form.errors.oldPassword}
              helperText={form.errors && form.errors.oldPassword}
              required={true}
            />
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={12}
            md={4}
            className={classNames(classes.row, classes.lGridPadding, classes.rGridPadding)}
          >
            <TextField
              name="newPassword"
              label="Nové heslo"
              type="password"
              fullWidth={true}
              value={form.lastName}
              onChange={handleInputChange}
              error={!!form.errors.newPassword}
              helperText={form.errors && form.errors.newPassword}
              required={true}
            />
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={12}
            md={4}
            className={classNames(classes.row, classes.rGridPadding)}
          >
            <TextField
              name="confirmPassword"
              label="Potvrdenie hesla"
              type="password"
              fullWidth={true}
              value={form.lastName}
              onChange={handleInputChange}
              error={!!form.errors.confirmPassword}
              helperText={form.errors && form.errors.confirmPassword}
              required={true}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.footer}>
        <BackBtn
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleChangePasswordForm(e);
          }}
          className={classes.btnMargin}
        />
        <SaveBtn onClick={handleOnSubmit} />
      </div>
    </form>
  );

  function handleInputChange(e) {
    dispatch({
      type: changePasswordFormActions.SET_FIELD,
      payload: { field: e.target.name, value: e.target.value }
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    if (form.isValid) {
      console.log('form is valid');
    }
  }
}

export default withStyles(styles)(ChangePasswordForm);
