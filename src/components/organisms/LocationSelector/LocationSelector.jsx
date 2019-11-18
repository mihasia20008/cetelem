import React from 'react';

import LocationIcon from './blocks/LocationIcon';

import styles from './LocationSelector.module.scss';

function LocationSelector() {
  return (
    <div className={styles.LocationSelector}>
      <LocationIcon />
      <span className={styles.city}>
        Москва
      </span>
    </div>
  );
}

export default LocationSelector;
