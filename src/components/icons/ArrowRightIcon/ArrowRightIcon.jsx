import React from 'react';
import cls from 'classnames';

import styles from './ArrowRightIcon.module.scss';

function ArrowRightIcon({ className }) {
  return (
    <svg
      viewBox="0 0 8 13"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.ArrowRightIcon, className)}
    >
      <path d="M0.295078 2.11496L4.87508 6.70496L0.295078 11.295L1.70508 12.705L7.70508 6.70496L1.70508 0.704956L0.295078 2.11496Z" />
    </svg>
  );
}

export default ArrowRightIcon;
