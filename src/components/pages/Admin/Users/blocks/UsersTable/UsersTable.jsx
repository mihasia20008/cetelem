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
import DeleteIcon from "@material-ui/icons/Delete";

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

const UsersTable = props => {
  const { className, users, ...rest } = props;

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
                  <TableCell className={styles.headItem}>Имя</TableCell>
                  <TableCell className={styles.headItem}>E-mail</TableCell>
                  <TableCell className={styles.headItem}>Роль</TableCell>
                  <TableCell className={styles.headItem}>Дата регистрации</TableCell>
                  <TableCell className={styles.headItem} />
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(user => {
                  const date = new Date(user.createdAt);
                  const createdDate = `${date
                    .getDate()
                    .toString()
                    .padStart(2, '0')}.0${date.getMonth() + 1}.${date.getFullYear()}`;
                  return (
                    <TableRow key={user.id} hover className={styles.tableRow}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>
                        <Typography variant="body1">{user.name}</Typography>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role ? 'Дилер' : 'Админ'}</TableCell>
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
          count={users.length}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.oneOf([0, 1]),
      createdAt: PropTypes.number,
    })
  ).isRequired,
};

UsersTable.defaultProps = {
  className: undefined,
};

export default UsersTable;
