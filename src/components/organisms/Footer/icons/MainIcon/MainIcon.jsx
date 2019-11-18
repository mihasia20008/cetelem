import React from 'react';
import cls from 'classnames';

import styles from './MainIcon.module.scss';

function MainIcon({ className }) {
  return (
    <svg
      viewBox="0 0 16 12"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.MainIcon, className)}
    >
      <path d="M16 2.40599L8.00008 6.17097L0.000149999 2.40599V1.99999C0.000149999 0.895496 0.895642 0 2.00013 0H14C15.1045 0 16 0.895496 16 1.99999V2.40599ZM7.99993 7.75002C8.10942 7.75002 8.21842 7.72602 8.31942 7.67852L15.9999 4.06403V10.5C15.9999 11.6045 15.1044 12 13.9999 12H1.99998C0.895492 12 0 11.6045 0 10.5V4.06403L7.68093 7.67852C7.78193 7.72602 7.89093 7.75002 7.99993 7.75002Z" />
    </svg>
  );
}

export default MainIcon;
