import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';

import _get from 'lodash/get';

import * as dealerCarsActions from '../../../../redux/modules/admin/dealerCars/actions';
import { getDealers } from '../../../../redux/modules/filters/actions';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ConfirmDialog from '../../../organisms/Admin/ConfirmDialog';
import ErrorShower from '../../../organisms/Admin/ErrorShower';

import formatNumber from '../../../../utilities/formatNumber';
import formatDate from '../../../../utilities/formatDate';

import DealerCarsToolbar from './blocks/DealerCarsToolbar';

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

function DealerCars(props) {
  const styles = useStyles();
  const {
    dealers,
    dealersLoaded,
    dealerCars: { data, ...statuses },
    dispatch,
  } = props;

  const [deletingCarId, setCarDelete] = useState(null);
  const [selectedDealer, setDealerFilter] = useState(0);

  useEffect(() => {
    dispatch(dealerCarsActions.getDealerCars());
    dispatch(getDealers());
  }, [dispatch]);

  const handleCloseError = () => {
    dispatch(dealerCarsActions.clearError());
  };

  const handleDeleteCar = id => setCarDelete(id);

  const handleCancelDelete = () => setCarDelete(null);

  const handleConfirmDelete = () => {
    dispatch(dealerCarsActions.deleteDealerCar(deletingCarId));
    setCarDelete(null);
  };

  const handleSelect = event => {
    const { value } = event.target;
    setDealerFilter(value);
  };

  const renderFormattedPrice = text => `${formatNumber(text)} ₽`;

  const filteredList =
    selectedDealer > 0 ? data.filter(car => car.dealer_id === selectedDealer) : data;

  return (
    <div className={styles.root}>
      <DealerCarsToolbar
        selected={selectedDealer}
        dealers={dealers}
        dealersLoaded={dealersLoaded}
        onSelect={handleSelect}
      />
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
                    id: 'dealer_name',
                    text: 'Дилер',
                  },
                  {
                    id: 'mark',
                    text: 'Марка',
                    formatter: text => <Typography variant="body1">{text}</Typography>,
                  },
                  {
                    id: 'model',
                    text: 'Модель',
                    formatter: text => <Typography variant="body1">{text}</Typography>,
                  },
                  {
                    id: 'modification',
                    text: 'Модификация',
                  },
                  {
                    id: 'price',
                    text: 'Цена',
                    formatter: renderFormattedPrice,
                  },
                  {
                    id: 'updated_at',
                    text: 'Дата изменения',
                    formatter: formatDate,
                  },
                  {
                    id: ACTIONS_COLUMN_ID,
                    text: '',
                  },
                ]}
                list={filteredList}
                statuses={statuses}
                onDelete={handleDeleteCar}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <ConfirmDialog
        open={Boolean(deletingCarId)}
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
    dealerCars: state.admin.dealerCars,
    dealers: _get(state, 'filters.data.dealer_id.options', []),
    dealersLoaded: _get(state, 'filters.dealer.success'),
  };
};

export default connect(mapStateToProps)(DealerCars);
