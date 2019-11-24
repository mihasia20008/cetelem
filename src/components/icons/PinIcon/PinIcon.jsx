import React from 'react';
import cls from 'classnames';

import styles from './PinIcon.module.scss';

function PinIcon({ className }) {
  return (
    <svg
      viewBox="0 0 19 27"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.PinIcon, className)}
    >
      <path d="M0 9.46421C0 4.23474 4.25075 0 9.5 0C14.7492 0 19 4.23474 19 9.46421C19 14.6937 9.5 27 9.5 27C9.5 27 0 14.6937 0 9.46421ZM4 9.5C4 12.5431 6.45685 15 9.5 15C12.5431 15 15 12.5431 15 9.5C15 6.45685 12.5431 4 9.5 4C6.45685 4 4 6.45685 4 9.5Z" />
    </svg>
  );
}

export default PinIcon;
