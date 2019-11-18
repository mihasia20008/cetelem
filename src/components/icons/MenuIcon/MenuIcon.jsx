import React from 'react';
import cls from 'classnames';

import styles from './MenuIcon.module.scss';

function MenuIcon({ className }) {
  return (
    <svg
      viewBox="0 0 26 20"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.MenuIcon, className)}
    >
      <path
        // fill-rule="evenodd"
        // clip-rule="evenodd"
        d="M0 0H26V2H0V0ZM0 9H26V11H0V9ZM26 18H0V20H26V18Z"
        fill="#2B2A29"
      />
    </svg>
  );
}

export default MenuIcon;
