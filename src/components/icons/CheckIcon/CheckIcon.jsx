import React from 'react';
import cls from 'classnames';

import styles from './CheckIcon.module.scss';

function CheckIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 18"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.CheckIcon, className)}
    >
      <path d="M8.15703 13.5895C7.86821 13.874 7.40451 13.874 7.1157 13.5895L2.84928 9.38681C2.32776 8.87306 1.49042 8.87306 0.968899 9.38681V9.38681C0.436164 9.91159 0.436164 10.7709 0.968898 11.2957L6.9609 17.1982C7.33558 17.5673 7.93715 17.5673 8.31183 17.1982L23.0311 2.69867C23.5638 2.17388 23.5638 1.31458 23.0311 0.789792V0.789792C22.5096 0.276051 21.6722 0.276051 21.1507 0.789792L8.15703 13.5895Z" />
    </svg>
  );
}

export default CheckIcon;
