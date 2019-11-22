import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import Topbar from '../../organisms/Admin/Topbar';
import Sidebar from '../../organisms/Admin/Slidebar';
// import Footer from '../../organisms/Admin/Footer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
}));

const AdminLayout = ({ children, authorized, pathname, userName, onLogout }) => {
  const styles = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  useEffect(handleSidebarClose, [pathname]);

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  if (authorized) {
    return (
      <div className={cls(styles.root, isDesktop && styles.shiftContent)}>
        <Topbar
          authorized
          userName={userName}
          onSidebarOpen={handleSidebarOpen}
          onLogout={onLogout}
        />
        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
          onLogout={onLogout}
        />
        <div className={styles.content}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Topbar authorized={false} onSidebarOpen={() => {}} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

AdminLayout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  authorized: PropTypes.bool.isRequired,
  pathname: PropTypes.string,
};

AdminLayout.defaultProps = {
  pathname: '',
};

export default AdminLayout;
