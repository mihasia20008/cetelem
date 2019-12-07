import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';

import _get from 'lodash/get';

import { getReservations, clearError } from '../../../../redux/modules/admin/reservations/actions';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';

import ReservationsToolbar from './blocks/ReservationsToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
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
        <Card>
          <PerfectScrollbar>
            <div className={styles.inner}>
              <SimpleTable
                headers={[
                  {
                    id: 'id',
                    text: 'ID',
                  },
                  {
                    id: 'client',
                    text: 'Клиент',
                  },
                  {
                    id: 'dealer',
                    text: 'Дилер',
                  },
                  {
                    id: 'car',
                    text: 'Автомобиль'
                  },
                  {
                    id: 'date',
                    text: 'Дата бронирования',
                  },
                  {
                    id: ACTIONS_COLUMN_ID,
                    text: '',
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
    reservations: state.admin.reservations,
  };
};

export default connect(mapStateToProps)(ReservationsPage);
