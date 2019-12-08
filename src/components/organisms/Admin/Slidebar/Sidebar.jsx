import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';

import { adminPages, dealerPages } from "./pages";

import Navigation from './Navigation';

import { ROLES } from "../../../../constants";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, userType, onClose, className, ...rest } = props;

  const styles = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: styles.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={styles.root}
      >
        <Navigation
          className={styles.nav}
          pages={userType === ROLES.ADMIN ? adminPages : dealerPages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
