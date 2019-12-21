import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import _get from 'lodash/get';

import PageLoading from '../../../../routes/PageLoading';

import CarsTotal from '../../../organisms/Admin/DashboardItems/CarsTotal';
import TotalReservations from '../../../organisms/Admin/DashboardItems/TotalReservations';

import LatestSales from './blocks/LatestSales';
import LatestOrders from './blocks/LatestOrders';

import { getReservations } from '../../../../redux/modules/dealer/reservations/actions';
import { getStatistics } from '../../../../redux/modules/dealer/statistics/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = props => {
  const {
    statistics: { data: statData, ...statStatuses },
    reservations: { data: reservData, ...reservStatuses },
    dispatch,
  } = props;
  const styles = useStyles();

  useEffect(() => {
    dispatch(getStatistics());
    dispatch(getReservations());
  }, [dispatch]);

  if (statStatuses.error || reservStatuses.error) {
    return <div>Error {JSON.stringify(statStatuses.error || reservStatuses.error)}</div>;
  }

  if (
    statStatuses.loading ||
    statStatuses.initial ||
    reservStatuses.loading ||
    reservStatuses.initial
  ) {
    return <PageLoading />;
  }

  const lastFiveBooks = reservData.slice(0, 5);

  return (
    <div className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <CarsTotal carsCount={statData.cars_total} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TotalReservations bookTotal={statData.reservations_total} />
        </Grid>
        <Grid item xs={12}>
          <LatestSales />
        </Grid>
        <Grid item xs={12}>
          <LatestOrders data={lastFiveBooks} statuses={reservStatuses} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    statistics: _get(state, 'dealer.statistics', {}),
    reservations: state.dealer.reservations,
  };
};

export default connect(mapStateToProps)(Dashboard);
