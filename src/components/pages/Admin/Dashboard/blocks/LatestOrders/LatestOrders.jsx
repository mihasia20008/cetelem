import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardHeader, CardContent, Button, Divider } from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { RoutesPaths } from '../../../../../../constants';

import SimpleTable from '../../../../../organisms/Admin/SimpleTable';

import formatDate from '../../../../../../utilities/formatDate';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  tableHead: {
    backgroundColor: '#fafafa',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const LatestOrders = props => {
  const { className, data, statuses } = props;

  const styles = useStyles();

  const renderCarName = (_, item) => {
    return `${item.mark} ${item.model}`;
  };

  return (
    <Card className={cls(styles.root, className)}>
      <CardHeader title="Последние 5 заказов" />
      <Divider />
      <CardContent className={styles.content}>
        <PerfectScrollbar>
          <div className={styles.inner}>
            <SimpleTable
              hidePagination
              headers={[
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
                  id: 'dealer',
                  text: 'Дилер',
                },
                {
                  id: 'created_at',
                  text: 'Дата создания',
                  formatter: formatDate,
                },
              ]}
              list={data}
              statuses={statuses}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={styles.actions}>
        <Button color="primary" size="small" variant="text" href={RoutesPaths.dealer.reservations}>
          Смотреть все <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
};

LatestOrders.defaultProps = {
  className: undefined,
};

export default LatestOrders;
