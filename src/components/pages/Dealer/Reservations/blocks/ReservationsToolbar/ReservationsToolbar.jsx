import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';

import SearchInput from '../../../../../organisms/Admin/SearchInput';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    minWidth: '420px',
    marginRight: theme.spacing(1),
    padding: '4px 8px'
  }
}));

const ReservationsToolbar = props => {
  const { className, searchText, onSearch, ...rest } = props;

  const styles = useStyles();

  return (
    <div
      {...rest}
      className={cls(styles.root, className)}
    >
      <div className={styles.row}>
        <SearchInput
          className={styles.searchInput}
          placeholder="Найти"
          value={searchText}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

ReservationsToolbar.propTypes = {
  className: PropTypes.string
};


ReservationsToolbar.defaultProps = {
  className: undefined,
};

export default ReservationsToolbar;
