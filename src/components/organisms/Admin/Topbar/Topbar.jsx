import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = ({ className, authorized, onSidebarOpen }) => {

  const styles = useStyles();

  const [notifications] = useState([]);

  const renderIconsForAuthorized = () => {
    if (!authorized) {
      return null;
    }

    return (
      <>
        <Hidden smDown>
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={styles.signOutButton} color="inherit">
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
};

Topbar.defaultProps = {
  className: undefined,
};

export default Topbar;
