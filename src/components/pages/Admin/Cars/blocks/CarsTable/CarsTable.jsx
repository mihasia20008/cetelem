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
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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

const CarsTable = props => {
  const { className, cars, ...rest } = props;

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
                  <TableCell className={styles.headItem}>ID</TableCell>
                  <TableCell className={styles.headItem}>Марка</TableCell>
                  <TableCell className={styles.headItem}>Модель</TableCell>
                  <TableCell className={styles.headItem}>Год выпуска</TableCell>
                  <TableCell className={styles.headItem}>Дата создания</TableCell>
                  <TableCell className={styles.headItem} />
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(car => {
                  const date = new Date(car.createdAt);
                  const createdDate = `${date
                    .getDate()
                    .toString()
                    .padStart(2, '0')}.0${date.getMonth() + 1}.${date.getFullYear()}`;
                  return (
                    <TableRow key={car.id} hover className={styles.tableRow}>
                      <TableCell>{car.id}</TableCell>
                      <TableCell>
                        <Typography variant="body1">{car.mark}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{car.model}</Typography>
                      </TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>{createdDate}</TableCell>
                      <TableCell className={styles.actions}>
                        <IconButton size="small">
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
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
          count={cars.length}
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

CarsTable.propTypes = {
  className: PropTypes.string,
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      mark: PropTypes.string,
      model: PropTypes.string,
      year: PropTypes.string,
      createdAt: PropTypes.number,
    })
  ).isRequired,
};

CarsTable.defaultProps = {
  className: undefined,
};

export default CarsTable;
