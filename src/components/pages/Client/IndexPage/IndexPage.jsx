import React from 'react';
import { Link } from "react-router-dom";

import styles from './IndexPage.module.scss';

export default () => {
  return (
    <div className={styles.IndexPage}>
      Index Page
      <br />
      <Link to="/admin">To admin</Link>
    </div>
  );
};
