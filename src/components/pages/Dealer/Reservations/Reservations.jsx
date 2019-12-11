import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';

import _get from 'lodash/get';

import { getReservations, clearError } from '../../../../redux/modules/dealer/reservations/actions';

import SimpleTable from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';

import ReservationsToolbar from './blocks/ReservationsToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  wrapper: {
    overflowX: 'auto',
  },
  inner: {
    minWidth: 1050,
  },
}));

function ReservationsPage(props) {
  const styles = useStyles();
  const { reservations: { data, ...statuses }, dispatch } = props;

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const handleCloseError = () => {
    dispatch(clearError());
  };

  return (
    <div className={styles.root}>
      <ReservationsToolbar />
      <div className={styles.content}>
        <Card className={styles.wrapper}>
          <PerfectScrollbar>
            <div className={styles.inner}>
              <SimpleTable
                headers={[
                  {
                    id: 'id',
                    text: 'ID',
                  },
                  {
                    id: 'name',
                    text: 'Клиент',
                  },
                  {
                    id: 'phone',
                    text: 'Номер телефона',
                  },
                  {
                    id: 'dealer_car_id',
                    text: 'Автомобиль'
                  },
                  {
                    id: 'created_at',
                    text: 'Дата создания',
                  },
                  {
                    id: 'updated_at',
                    text: 'Дата изменения',
                  },
                ]}
                list={data}
                statuses={statuses}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <ErrorShower
        open={Boolean(statuses.error)}
        message={_get(statuses, 'error.message')}
        onClose={handleCloseError}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    reservations: state.dealer.reservations,
  };
};

export default connect(mapStateToProps)(ReservationsPage);
