import React from 'react';
import cls from 'classnames';

import styles from './CloseIcon.module.scss';

function CloseIcon({ className }) {
  return (
    <svg
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.CloseIcon, className)}
    >
      <path d="M5.5 7L0.5 2L2 0.5L7 5.5L12 0.5L13.5 2L8.5 7L13.5 12L12 13.5L7 8.5L2 13.5L0.5 12L5.5 7Z" />
    </svg>
  );
}

export default CloseIcon;
