import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';

import _get from 'lodash/get';

import { getReservations, clearError } from '../../../../redux/modules/dealer/reservations/actions';

import formatDate from '../../../../utilities/formatDate';

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

  const [searchText, onChangeSearchText] = useState('');

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const handleSearch = event => {
    event.persist();
    onChangeSearchText(event.target.value);
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const renderCarName = (_, item) => {
    return `${item.mark} ${item.model}`;
  };

  const filteredList = searchText
    ? data.filter(item =>
      Object.values(item).some(value => {
        if (!value) {
          return false;
        }
        return (
          value
            .toString()
            .toLowerCase()
            .search(searchText.toLowerCase()) !== -1
        );
      })
    )
    : data;

  return (
    <div className={styles.root}>
      <ReservationsToolbar searchText={searchText} onSearch={handleSearch} />
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
                    id: 'client_id',
                    text: 'ID клиента',
                  },
                  {
                    id: 'name',
                    text: 'ФИО',
                  },
                  {
                    id: 'phone',
                    text: 'Номер телефона',
                  },
                  {
                    id: 'dealer_car_id',
                    text: 'Автомобиль',
                    formatter: renderCarName,
                  },
                  {
                    id: 'vin',
                    text: 'VIN',
                  },
                  {
                    id: 'created_at',
                    text: 'Дата создания',
                    formatter: formatDate,
                  },
                ]}
                list={filteredList}
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
