import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

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
  downloadButton: {
    marginRight: theme.spacing(1),
  },
}));

const CarsListToolbar = props => {
  const { id, className, onOpenImportForm, ...rest } = props;

  const styles = useStyles();
  // const id = 4;

  return (
    <div {...rest} className={cls(styles.root, className)}>
      <div className={styles.row} />
      <div className={styles.row}>
        <span className={styles.spacer} />
        {Boolean(id) && (
          <Button
            href={`/api/v1/dealers/${id}/cars.xls`}
            className={styles.downloadButton}
            color="primary"
            variant="outlined"
            download
          >
            Экспорт .xsl
          </Button>
        )}
        <Button color="primary" variant="contained" onClick={onOpenImportForm}>
          Импорт .xsl
        </Button>
      </div>
    </div>
  );
};

CarsListToolbar.propTypes = {
  id: PropTypes.number,
  className: PropTypes.string,
  onOpenImportForm: PropTypes.func.isRequired,
};

CarsListToolbar.defaultProps = {
  id: undefined,
  className: undefined,
};

export default CarsListToolbar;
