import { red, green } from '@material-ui/core/colors';

export const landingStyles = theme => ({
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
  error: {
    color: red[500]
  },
  success: {
    color: green[500]
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
    marginTop: theme.spacing.unit,
    textAlign: 'center'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  register: {
    marginTop: theme.spacing.unit * 3
  },
  back: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2
  }
});
