import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { Button } from '@material-ui/core';
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
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  searchInput: {
    minWidth: '420px',
    marginRight: theme.spacing(1),
  },
}));

const CarsToolbar = props => {
  const { className, searchText, onSearch, onOpenCreateForm } = props;

  const styles = useStyles();

  return (
    <div className={cls(styles.root, className)}>
      <div className={styles.row}>
        <SearchInput
          className={styles.searchInput}
          placeholder="Найти"
          value={searchText}
          onChange={onSearch}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.spacer} />
        <Button color="primary" variant="contained" onClick={onOpenCreateForm}>
          Добавить
        </Button>
      </div>
    </div>
  );
};

CarsToolbar.propTypes = {
  className: PropTypes.string,
};

CarsToolbar.defaultProps = {
  className: undefined,
};

export default CarsToolbar;
