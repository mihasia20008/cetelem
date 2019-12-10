import React from 'react';
import cls from 'classnames';

import styles from './LockIcon.module.scss';

function LockIcon({ className }) {
  return (
    <svg
      viewBox="0 0 42 48"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.LockIcon, className)}
    >
      <g transform="translate(-294.000000, -55.000000)">
        <path d="M324,74.5 L306,74.5 L306,70 C306,65.0365 310.0365,61 315,61 C319.9635,61 324,65.0365 324,70 L324,74.5 Z M318,91 C318,92.65 316.65,94 315,94 C313.35,94 312,92.65 312,91 L312,85 C312,83.35 313.35,82 315,82 C316.65,82 318,83.35 318,85 L318,91 Z M330,74.5 L330,70 C330,61.729 323.271,55 315,55 C306.729,55 300,61.729 300,70 L300,74.5 C296.6865,74.5 294,77.1865 294,80.5 L294,97 C294,100.3135 296.6865,103 300,103 L330,103 C333.3135,103 336,100.3135 336,97 L336,80.5 C336,77.1865 333.3135,74.5 330,74.5 L330,74.5 Z" />
      </g>
    </svg>
  );
}

export default LockIcon;
