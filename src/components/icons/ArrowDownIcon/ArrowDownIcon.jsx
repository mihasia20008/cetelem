import React from 'react';
import cls from 'classnames';

import styles from './ArrowDownIcon.module.scss';

function ArrowDownIcon({ className }) {
  return (
    <svg
      viewBox="0 0 14 8"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.ArrowDownIcon, className)}
    >
      <path d="M1.645 0L7 4.94467L12.355 0L14 1.52227L7 8L0 1.52227L1.645 0Z" />
    </svg>
  );
}

export default ArrowDownIcon;
