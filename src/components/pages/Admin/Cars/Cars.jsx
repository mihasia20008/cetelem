import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import CarsTable from './blocks/CarsTable';
import CarsToolbar from './blocks/CarsToolbar';

import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

function UsersPage() {
  const styles = useStyles();

  const [cars] = useState(mockData);

  return (
    <div className={styles.root}>
      <CarsToolbar />
      <div className={styles.content}>
        <CarsTable cars={cars} />
      </div>
    </div>
  );
}

export default UsersPage;
