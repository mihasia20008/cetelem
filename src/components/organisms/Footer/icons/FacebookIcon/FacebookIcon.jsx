import React from 'react';
import cls from 'classnames';

import styles from './Facebook.module.scss';

function FacebookIcon({ className }) {
  return (
    <svg
      viewBox="0 0 12 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.FacebookIcon, className)}
    >
      <path d="M7.48925 23.6476V12.2225H10.6431L11.061 8.28533H7.48925L7.49461 6.31474C7.49461 5.28787 7.59218 4.73765 9.06706 4.73765H11.0387V0.800049H7.88443C4.09564 0.800049 2.76208 2.70999 2.76208 5.92192V8.28577H0.400391V12.2229H2.76208V23.6476H7.48925Z" />
    </svg>
  );
}

export default FacebookIcon;
