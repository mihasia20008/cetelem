import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import _get from 'lodash/get';

import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { clearError, getCars } from '../../../../redux/modules/admin/cars/actions';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';

import CarsToolbar from './blocks/CarsToolbar';

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

function CarsPage(props) {
  const {
    cars: { data, ...statuses },
    dispatch,
  } = props;
  const styles = useStyles();
  const [searchText, onChangeSearchText] = useState('');

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const handleSearch = event => {
    event.persist();
    onChangeSearchText(event.target.value);
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
      <CarsToolbar searchText={searchText} onSearch={handleSearch} />
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
                    id: 'mark',
                    text: 'Марка',
                  },
                  {
                    id: 'model',
                    text: 'Модель',
                  },
                  {
                    id: 'modification',
                    text: 'Модификация',
                  },
                  {
                    id: 'body_type',
                    text: 'Кузов',
                  },
                  {
                    id: 'years',
                    text: 'Года выпуска',
                  },
                  {
                    id: 'complectation',
                    text: 'Комплектация',
                  },
                  {
                    id: ACTIONS_COLUMN_ID,
                    text: '',
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
    cars: state.admin.cars,
  };
};

export default connect(mapStateToProps)(CarsPage);
