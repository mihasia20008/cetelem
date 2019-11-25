import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import ReservationsTable from './blocks/ReservationsTable';
import ReservationsToolbar from './blocks/ReservationsToolbar';

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

  const [reservations] = useState(mockData);

  return (
    <div className={styles.root}>
      <ReservationsToolbar />
      <div className={styles.content}>
        <ReservationsTable reservations={reservations} />
      </div>
    </div>
  );
}

export default UsersPage;
