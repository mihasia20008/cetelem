import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <NavLink {...props} />
  </div>
));

const Navigation = ({ pages, className, ...rest }) => {
  const styles = useStyles();

  return (
    <List
      {...rest}
      className={cls(styles.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={styles.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={styles.active}
            className={styles.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={styles.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

Navigation.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
  })).isRequired
};

export default Navigation;
