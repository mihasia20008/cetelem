import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  name: {
    userSelect: 'none',
    marginRight: theme.spacing(1),
    color: theme.palette.white,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = ({ className, userName, authorized, onSidebarOpen, onLogout }) => {

  const styles = useStyles();

  const renderIconsForAuthorized = () => {
    if (!authorized) {
      return null;
    }

    return (
      <>
        <Hidden smDown>
          {userName && (
            <Typography variant="h4" className={styles.name}>
              {userName}
            </Typography>
          )}
          <IconButton
            className={styles.signOutButton}
            color="inherit"
            onClick={onLogout}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </>
    );
  };

  return (
    <AppBar className={cls(styles.root, className)}>
      <Toolbar>
        <Link to="/admin">
          <img alt="Сетелем" src="/images/footerLogo.svg" />
        </Link>
        <div className={styles.flexGrow} />
        {renderIconsForAuthorized()}
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  authorized: PropTypes.bool.isRequired,
  onSidebarOpen: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

Topbar.defaultProps = {
  className: undefined,
};

export default Topbar;
