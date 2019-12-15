import React from 'react';
import cls from 'classnames';

import styles from './PersonalIcon.module.scss';

function PersonalIcon({ className }) {
  return (
    <svg
      viewBox="0 0 258.75 258.75"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.PersonalIcon, className)}
    >
      <circle cx="129.375" cy="60" r="60"/>
      <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
    </svg>
  );
}

export default PersonalIcon;
