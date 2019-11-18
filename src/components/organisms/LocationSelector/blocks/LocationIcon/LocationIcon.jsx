import React from 'react';
import cls from 'classnames';

import styles from './LocationIcon.module.scss';

function LocationIcon({ className }) {
  return (
    <svg
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.LocationIcon, className)}
    >
      <path d="M9.22766 3.39966L0 0L6.64755 18L8.92411 9.28836C8.98482 9.10624 9.10624 8.98482 9.28836 8.92411L18 6.64755L9.22766 3.39966Z" />
    </svg>
  );
}

export default LocationIcon;
