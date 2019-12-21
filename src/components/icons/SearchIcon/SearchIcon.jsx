import React from 'react';
import cls from 'classnames';

import styles from './SearchIcon.module.scss';

function SearchIcon({ className }) {
  return (
    <svg
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.SearchIcon, className)}
    >
      <path d="M0.596056 18L5.35519 13.2409C6.69746 14.4425 8.47013 15.1731 10.4134 15.1731C14.6034 15.1731 18 11.7765 18 7.58656C18 3.39662 14.6034 0 10.4134 0C6.2235 0 2.82688 3.39662 2.82688 7.58656C2.82688 9.52987 3.55755 11.3025 4.75914 12.6448L0 17.4039L0.596056 18ZM17.157 7.58656C17.157 11.311 14.1378 14.3302 10.4134 14.3302C6.68905 14.3302 3.66983 11.311 3.66983 7.58656C3.66983 3.86217 6.68905 0.842951 10.4134 0.842951C14.1378 0.842951 17.157 3.86217 17.157 7.58656Z" />
    </svg>
  );
}

export default SearchIcon;
