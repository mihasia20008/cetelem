import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={cls(classes.root, className)}
    >
      <Typography variant="body1">
        &copy; Сетелем. {new Date().getFullYear()}
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
