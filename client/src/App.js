import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import CookieConsent from 'react-cookie-consent';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import Routes from './core/routes';
import Footer from './core/Footer';
import 'react-toastify/dist/ReactToastify.css';
import Header from './core/Header';
import SuspenseWithCenteredCircularFallback from '_components/SuspenseWithCenteredCircularFallback';
import history from '_utils/history';
import routes from '_constants/routesConstants';

const styles = theme => ({
  app: {
    width: 'auto',
    height: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    fontFamily: 'Roboto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px 0`
    }
  },
  consent: {
    backgroundColor: 'rgba(53, 53, 53, 0.95) !important',
    padding: '0 80px',
    [theme.breakpoints.down('md')]: {
      padding: '0 8px'
    }
  },
  consentLink: {
    textDecoration: 'underline',
    color: 'white'
  },
  consentBtn: {
    fontSize: '100%',
    fontFamily: 'inherit',
    lineHeight: 1.15
  }
});

class App extends Component {
  componentDidMount = () => {
    const { cookies } = this.props;

    if (Boolean(cookies.get('cookies-consent'))) {
      this.setupGoogleAnalytics();
    }
  };

  setupGoogleAnalytics = () => {
    ReactGA.initialize('UA-136396880-1');
    ReactGA.pageview(history.location.pathname + history.location.search);

    history.listen((location, action) => {
      ReactGA.pageview(location.pathname + location.search);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <Header />
        <div className={classes.content}>
          <SuspenseWithCenteredCircularFallback>
            <Routes />
          </SuspenseWithCenteredCircularFallback>
        </div>
        <Footer />
        <CookieConsent
          onAccept={this.setupGoogleAnalytics}
          location="bottom"
          buttonText="Súhlasím"
          cookieName="cookies-consent"
          buttonClasses={classes.consentBtn}
          containerClasses={classes.consent}
          expires={150}
        >
          Tento web používa súbory cookies. Prehliadaním webu vyjadrujete súhlas s ich používaním a
          súhlas s uchovávaním osobných údajov. &nbsp;&nbsp;&nbsp;
          <Link to={routes.POLICY} className={classes.consentLink}>
            Viac informácií
          </Link>
        </CookieConsent>
      </div>
    );
  }
}

export default withStyles(styles)(withCookies(App));
