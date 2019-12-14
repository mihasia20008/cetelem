import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { MenuItem, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const DealerCarsToolbar = props => {
  const { className, selected, dealers, dealersLoaded, onSelect } = props;

  const styles = useStyles();

  const renderDealerSelect = () => {
    if (!dealersLoaded) {
      return null;
    }

    return (
      <FormControl className={styles.formControl}>
        <Select
          labelId="dealer-select-label"
          id="dealer-select"
          value={selected}
          onChange={onSelect}
        >
          {dealers.map(dealer => (
            <MenuItem key={dealer.id} value={dealer.id}>
              {dealer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div className={cls(styles.root, className)}>
      <div className={styles.row}>{renderDealerSelect()}</div>
    </div>
  );
};

DealerCarsToolbar.propTypes = {
  className: PropTypes.string,
};

DealerCarsToolbar.defaultProps = {
  className: undefined,
};

export default DealerCarsToolbar;
