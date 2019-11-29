import React from 'react';
import cls from 'classnames';

import styles from './PhoneIcon.module.scss';

function PhoneIcon({ className }) {
  return (
    <svg
      viewBox="0 0 11 16"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.PhoneIcon, className)}
    >
      <path d="M9.16667 11C9.16667 11.5525 8.75646 12 8.25 12H2.75C2.24354 12 1.83333 11.5525 1.83333 11V3C1.83333 2.4475 2.24354 2 2.75 2H8.25C8.75646 2 9.16667 2.4475 9.16667 3V11ZM5.5 15C4.99354 15 4.58333 14.5525 4.58333 14C4.58333 13.4475 4.99354 13 5.5 13C6.00646 13 6.41667 13.4475 6.41667 14C6.41667 14.5525 6.00646 15 5.5 15ZM9.16667 0H1.83333C0.820875 0 0 0.8955 0 2V14C0 15.1045 0.820875 16 1.83333 16H9.16667C10.1791 16 11 15.1045 11 14V2C11 0.8955 10.1791 0 9.16667 0Z" />
    </svg>
  );
}

export default PhoneIcon;
