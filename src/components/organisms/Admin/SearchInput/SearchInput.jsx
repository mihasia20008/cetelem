import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));

const SearchInput = props => {
  const { className, onChange, ...rest } = props;

  const styles = useStyles();

  return (
    <Paper {...rest} className={cls(styles.root, className)}>
      <SearchIcon className={styles.icon} />
      <Input {...rest} className={styles.input} disableUnderline onChange={onChange} />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

SearchInput.defaultProps = {
  className: undefined,
  onChange: () => {},
};

export default SearchInput;
