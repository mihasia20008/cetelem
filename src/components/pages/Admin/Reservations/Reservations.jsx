import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import {Card} from '@material-ui/core';

import _get from 'lodash/get';

import * as reservationsActions from '../../../../redux/modules/admin/reservations/actions';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';

import ReservationsToolbar from './blocks/ReservationsToolbar';
import ConfirmDialog from "../../../organisms/Admin/ConfirmDialog";

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

  const [deletingReservationId, setReservationDelete] = useState(null);

  useEffect(() => {
    dispatch(reservationsActions.getReservations());
  }, [dispatch]);

  const handleCloseError = () => {
    dispatch(reservationsActions.clearError());
  };

  // const handleDeleteReservation = id => setReservationDelete(id);

  const handleCancelDelete = () => setReservationDelete(null);

  const handleConfirmDelete = () => {
    // dispatch(reservationsActions.deleteUser(deletingReservationId));
    setReservationDelete(null);
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
                    id: 'dealer',
                    text: 'Дилер',
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
                  {
                    id: ACTIONS_COLUMN_ID,
                    text: '',
                  },
                ]}
                list={data}
                statuses={statuses}
                // onDelete={handleDeleteReservation}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>

      <ConfirmDialog
        open={Boolean(deletingReservationId)}
        texts={{
          title: 'Удаление записи',
          body: (
            <>
              Вы собираетесь удалить данную запись.
              <br />
              <b>Данное действие невозможно отменить.</b> Хотите продолжить?
            </>
          ),
          cancel: 'Отмена',
          confirm: 'Удалить',
        }}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
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
