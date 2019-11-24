import React from 'react';
import cls from 'classnames';

import styles from './RatingIcon.module.scss';

function RatingIcon({ className, active }) {
  return (
    <svg
      viewBox="0 0 16 15"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.RatingIcon, active && styles.activeIcon, className)}
    >
      <path d="M8 12L3.29772 14.4721L4.19577 9.23607L0.391548 5.52786L5.64886 4.76393L8 0L10.3511 4.76393L15.6085 5.52786L11.8042 9.23607L12.7023 14.4721L8 12Z" />
    </svg>
  );
}

export default RatingIcon;
