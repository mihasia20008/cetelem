import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import UsersTable from './blocks/UsersTable';
import UsersToolbar from './blocks/UsersToolbar';

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

  const [users] = useState(mockData);

  return (
    <div className={styles.root}>
      <UsersToolbar />
      <div className={styles.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(UsersPage);
