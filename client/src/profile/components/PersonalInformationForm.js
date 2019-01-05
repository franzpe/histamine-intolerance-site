import React, { useState, Fragment } from 'react';
import { withStyles, TextField, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { showSuccessToast, showErrorToast } from '_utils/toast';
import SaveBtn from '_components/buttons/SaveBtn';

const styles = theme => ({
  header: {
    width: '100%',
    textAlign: 'center'
  },
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  formContent: {
    flex: '1',
    width: '100%'
  },
  editIcon: {
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      color: theme.palette.secondary.main
    }
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
  section: {
    marginBottom: theme.spacing.unit * 3
  },
  detail: {
    height: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit
  },
  detailLabel: {
    display: 'inline-block',
    width: '160px',
    textAlign: 'left',
    verticalAlign: 'top'
  },
  detailInformation: {
    display: 'inline-block',
    verticalAlign: 'top'
  },
  contactEmail: {
    verticalAlign: 'top',
    padding: `1px 0 ${theme.spacing.unit / 2}px 0`,
    letterSpacing: '0.01071em'
  }
});

const USER_INFORMATION_QUERY = gql`
  {
    me {
      email
      firstName
      lastName
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($contactEmail: String, $firstName: String, $lastName: String) {
    updateUser(email: $contactEmail, firstName: $firstName, lastName: $lastName) {
      email
      firstName
      lastName
    }
  }
`;

function PersonalInformationForm({ classes, toggleChangePasswordForm }) {
  const userInformation = useQuery(USER_INFORMATION_QUERY).data;
  const [informationForm, setInformationForm] = useState({
    isContactEmailEditable: false,
    isSaving: false,
    contactEmail: userInformation.me.email,
    firstName: userInformation.me.firstName || '',
    lastName: userInformation.me.lastName || ''
  });
  const updateMutation = useMutation(UPDATE_USER_MUTATION);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.header}>
        <Typography variant="h6" component="h4" gutterBottom={true}>
          Osobné informácie
        </Typography>
      </div>
      <div className={classes.formContent}>
        <div className={classes.section}>
          <div className={classes.detail}>
            <Typography variant="body2" component="span" className={classes.detailLabel}>
              Contact email:
            </Typography>
            {!informationForm.isContactEmailEditable ? (
              <Fragment>
                <Typography variant="body2" component="span" className={classes.detailInformation}>
                  {informationForm.contactEmail}
                </Typography>
                &nbsp;&nbsp;
                <EditIcon
                  className={classes.editIcon}
                  onClick={() =>
                    setInformationForm({ ...informationForm, isContactEmailEditable: true })
                  }
                />
              </Fragment>
            ) : (
              <TextField
                name="contactEmail"
                value={informationForm.contactEmail}
                inputProps={{
                  className: classes.contactEmail,
                  style: { fontSize: '0.875rem' }
                }}
                onChange={handleInputChange}
                style={{ fontSize: '0.875rem' }}
              />
            )}
          </div>
          <div className={classes.detail}>
            <Typography variant="body2" component="span" className={classes.detailLabel}>
              Password:
            </Typography>
            <Typography variant="body2" component="span" className={classes.detailInformation}>
              ******
            </Typography>
            &nbsp;&nbsp;
            <EditIcon className={classes.editIcon} onClick={toggleChangePasswordForm} />
          </div>
        </div>
        <Grid container={true}>
          <Grid item={true} xs={12} sm={12} md={6} className={classes.rGridPadding}>
            <TextField
              name="firstName"
              label="First name"
              fullWidth={true}
              value={informationForm.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6} className={classes.lGridPadding}>
            <TextField
              name="lastName"
              label="Last name"
              fullWidth={true}
              value={informationForm.lastName}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </div>
      <SaveBtn disabled={informationForm.isSaving} />
    </form>
  );

  function handleInputChange(e) {
    setInformationForm({ ...informationForm, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInformationForm({ ...informationForm, isSaving: true });
    updateMutation({ variables: informationForm })
      .then(() => {
        showSuccessToast('Your data has been saved');
        setInformationForm({ ...informationForm, isSaving: false });
      })
      .catch(() => {
        showErrorToast('Please try again, something went wrong');
        setInformationForm({ ...informationForm, isSaving: false });
      });
  }
}

export default withStyles(styles)(PersonalInformationForm);
