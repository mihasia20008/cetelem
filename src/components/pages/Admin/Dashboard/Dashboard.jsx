import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Budget from './blocks/Budget';
import TotalUsers from './blocks/TotalUsers';
import TasksProgress from './blocks/TasksProgress';
import TotalProfit from './blocks/TotalProfit';

import LatestSales from './blocks/LatestSales';
import UsersByDevice from './blocks/UsersByDevice';

import LatestProducts from './blocks/LatestProducts';
import LatestOrders from './blocks/LatestOrders';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <Budget />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <TotalUsers />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <TasksProgress />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <TotalProfit />
        </Grid>
        <Grid item xs={12} md={12} lg={8} xl={9}>
          <LatestSales />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <UsersByDevice />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <LatestProducts />
        </Grid>
        <Grid item xs={12} md={12} lg={8} xl={9}>
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
