import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import LocationIcon from './blocks/LocationIcon';

import styles from './LocationSelector.module.scss';

function LocationSelector(props) {
  const { showIcon, primaryLink } = props;

  return (
    <div className={cls(styles.LocationSelector, primaryLink && styles.primaryLink)}>
      {showIcon && <LocationIcon />}
      <span className={cls(styles.city, primaryLink && styles.primaryLink)}>
        Москва
      </span>
    </div>
  );
}

LocationSelector.propTypes = {
  showIcon: PropTypes.bool,
  primaryLink: PropTypes.bool,
};

LocationSelector.defaultProps = {
  showIcon: false,
  primaryLink: false,
};

export default LocationSelector;
