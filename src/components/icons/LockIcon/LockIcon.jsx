import React from 'react';
import cls from 'classnames';

import styles from './LockIcon.module.scss';

function LockIcon({ className }) {
  return (
    <svg
      viewBox="0 0 60 48"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.LockIcon, className)}
    >
      <path className={styles.body} d="M18 25.5C18 22.1865 20.6865 19.5 24 19.5H54C57.3135 19.5 60 22.1865 60 25.5V42C60 45.3135 57.3135 48 54 48H24C20.6865 48 18 45.3135 18 42V25.5ZM39 39C40.65 39 42 37.65 42 36V30C42 28.35 40.65 27 39 27C37.35 27 36 28.35 36 30V36C36 37.65 37.35 39 39 39Z" />
      <path className={styles.top} d="M27 19.5C27 19.5 27 19 27 15.5C27 8.59644 21.6274 3 15 3C8.37258 3 3 8.59644 3 15.5V19.5" />
    </svg>
  );
}

export default LockIcon;
