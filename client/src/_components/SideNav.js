import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/LockOutlined';
import { withStyles, IconButton } from '@material-ui/core';
import FacebookLoginBtn from './buttons/FacebookLoginBtn';
import { ReactComponent as FacebookSvg } from '_assets/facebook_icon.svg';
import { sections } from 'core/Header';
import history from '_utils/history';

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  btn: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  },
  facebook: {
    color: 'rgba(0, 0, 0, 0.54)',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fontSize: '24px',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    userSelect: 'none',
    flexShrink: '0',
    '& g path:first-child': {
      fill: 'rgba(0, 0, 0, 0.54)'
    }
  },
  showOnlyOnMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
});

function SideNav({ classes }) {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => () => {
    setState({ ...state, [side]: open });
  };

  const sideList = (
    <div className={classes.list}>
      <List className={classes.showOnlyOnMobile}>
        {sections.map((section, index) => (
          <ListItem key={section.label} button={true} onClick={() => history.push(section.to)}>
            <ListItemIcon>{section.icon}</ListItemIcon>
            <ListItemText primary={section.label} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.showOnlyOnMobile} />
      <List>
        <FacebookLoginBtn
          render={({ onClick }) => (
            <ListItem button={true} onClick={onClick}>
              <ListItemIcon>
                <FacebookSvg alt="Prihlasenie cez Facebook" className={classes.facebook} />
              </ListItemIcon>
              <ListItemText primary="FB prihlásenie" />
            </ListItem>
          )}
        />
        <ListItem button={true}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Prihlásenie" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer('left', true)} className={classes.btn}>
        <MenuIcon fontSize="default" />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(SideNav);
