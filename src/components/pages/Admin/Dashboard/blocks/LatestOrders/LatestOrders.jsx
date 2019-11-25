import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';

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
  const { className, ...rest } = props;

  const styles = useStyles();

  const [orders] = useState(mockData);

  return (
    <Card {...rest} className={cls(styles.root, className)}>
      <CardHeader title="Последние заказы" />
      <Divider />
      <CardContent className={styles.content}>
        <PerfectScrollbar>
          <div className={styles.inner}>
            <Table>
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell>Номер заказа</TableCell>
                  <TableCell>Покупатель</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Дата
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => {
                  const date = new Date(order.createdAt);
                  const createdDate = `${date.getDate().toString().padStart(2, '0')}.0${date.getMonth() + 1}.${date.getFullYear()}`;
                  return (
                    <TableRow hover key={order.id}>
                      <TableCell>{order.ref}</TableCell>
                      <TableCell>{order.customer.name}</TableCell>
                      <TableCell>{createdDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={styles.actions}>
        <Button color="primary" size="small" variant="text">
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
