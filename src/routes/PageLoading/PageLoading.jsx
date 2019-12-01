import React from 'react';

import LoaderIcon from '../../components/icons/LoaderIcon';

import styles from './PageLoading.module.scss';

function PageLoading() {
  return (
    <div className={styles.PageLoading}>
      <LoaderIcon className={styles.loader} />
    </div>
  );
}

export default PageLoading;
