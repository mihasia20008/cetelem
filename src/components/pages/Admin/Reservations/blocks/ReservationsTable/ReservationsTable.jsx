import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  tableHead: {
    backgroundColor: '#fafafa',
  },
  headItem: {
    fontSize: '14px',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const ReservationsTable = props => {
  const { className, reservations, ...rest } = props;

  const styles = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const getItemsOnPageInfo = ({ from, to, count }) => {
    return ''
      .concat(from, '-')
      .concat(to === -1 ? count : to, ' из ')
      .concat(count);
  };

  return (
    <Card {...rest} className={cls(styles.root, className)}>
      <CardContent className={styles.content}>
        <PerfectScrollbar>
          <div className={styles.inner}>
            <Table>
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell className={styles.headItem}>ID заказа</TableCell>
                  <TableCell className={styles.headItem}>ID машины</TableCell>
                  <TableCell className={styles.headItem}>ID дилера</TableCell>
                  <TableCell className={styles.headItem}>ID клиента</TableCell>
                  <TableCell className={styles.headItem}>Номер телефона</TableCell>
                  <TableCell className={styles.headItem}>Дата создания</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(reservation => {
                    const date = new Date(reservation.createdAt);
                    const createdDate = `${date
                      .getDate()
                      .toString()
                      .padStart(2, '0')}.0${date.getMonth() + 1}.${date.getFullYear()}`;
                    return (
                      <TableRow key={reservation.id} hover className={styles.tableRow}>
                        <TableCell>{reservation.id}</TableCell>
                        <TableCell>
                          <Typography variant="body1">{reservation.carId}</Typography>
                        </TableCell>
                        <TableCell>{reservation.dealerId}</TableCell>
                        <TableCell>
                          <Typography variant="body1">{reservation.clientId}</Typography>
                        </TableCell>
                        <TableCell>
                          {reservation.phone}
                        </TableCell>
                        <TableCell>{createdDate}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={styles.actions}>
        <TablePagination
          component="div"
          count={reservations.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          labelRowsPerPage="Элементов на странице"
          labelDisplayedRows={getItemsOnPageInfo}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

ReservationsTable.propTypes = {
  className: PropTypes.string,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      carId: PropTypes.string,
      dealerId: PropTypes.string,
      clientId: PropTypes.string,
      phone: PropTypes.string,
      createdAt: PropTypes.number,
    })
  ).isRequired,
};

ReservationsTable.defaultProps = {
  className: undefined,
};

export default ReservationsTable;
