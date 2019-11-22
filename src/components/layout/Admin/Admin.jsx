import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import TopBar from '../../organisms/Admin/Topbar';
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

const AdminLayout = ({ children, authorized }) => {
  const styles = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  // const [openSidebar, setOpenSidebar] = useState(false);

  // const handleSidebarOpen = () => {
  //   setOpenSidebar(true);
  // };

  // const handleSidebarClose = () => {
  //   setOpenSidebar(false);
  // };

  // const shouldOpenSidebar = isDesktop ? true : openSidebar;

  if (authorized) {
    return (
      <div className={cls(styles.root, isDesktop && styles.shiftContent)}>
        <TopBar authorized onSidebarOpen={() => {}} />
        <div className={styles.content}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <TopBar authorized={false} onSidebarOpen={() => {}} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
