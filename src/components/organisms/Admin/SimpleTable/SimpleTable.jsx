import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './SimpleTable.module.scss';

export const ACTIONS_COLUMN_ID = 'actions';

function SimpleTable(props) {
  const { headers, list, statuses } = props;

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

  const renderTableHeader = () => (
    <TableHead className={styles.tableHead}>
      <TableRow>
        {headers.map(item => (
          <TableCell key={item.id} className={styles.headItem}>
            {item.text}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderTableItem = item => (
    <>
      {headers.map(column => {
        if (column.id === ACTIONS_COLUMN_ID) {
          return (
            <TableCell key={ACTIONS_COLUMN_ID}>
              <IconButton size="small">
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          );
        }
        if (typeof column.formatter === 'function') {
          return <TableCell key={column.id}>{column.formatter(item[column.id])}</TableCell>;
        }
        return <TableCell key={column.id}>{item[column.id]}</TableCell>;
      })}
    </>
  );

  const renderTableBody = () => (
    <TableBody>
      {list.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) => (
        <TableRow key={item.id || index} hover>
          {renderTableItem(item)}
        </TableRow>
      ))}
    </TableBody>
  );

  const renderNoData = () => {
    if (statuses.success && !list.length) {
      return (
        <div className={styles.noDataWrapper}>
          Нет данных
        </div>
      );
    }

    return null;
  };

  const renderTableLoader = () => {
    if (statuses.initial || statuses.loading) {
      return (
        <div className={styles.loaderWrap}>
          <CircularProgress size={32} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.SimpleTable}>
      <Table>
        {renderTableHeader()}
        {renderTableBody()}
      </Table>
      {renderNoData()}
      <div className={styles.actionsWrap}>
        <TablePagination
          component="div"
          count={list.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          labelRowsPerPage="Элементов на странице"
          labelDisplayedRows={getItemsOnPageInfo}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
      {renderTableLoader()}
    </div>
  );
}

SimpleTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      formatter: PropTypes.func,
    })
  ).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  statuses: PropTypes.shape({
    initial: PropTypes.bool,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
  }),
};

SimpleTable.defaultProps = {
  list: [],
  statuses: {},
};

export default SimpleTable;
