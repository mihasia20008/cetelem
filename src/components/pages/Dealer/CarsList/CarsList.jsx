import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { makeStyles } from '@material-ui/styles';
import { Card, Drawer, Typography } from '@material-ui/core';

import _get from 'lodash/get';

import * as carsListActions from '../../../../redux/modules/dealer/carsList/actions';

import SimpleTable from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';

import formatNumber from '../../../../utilities/formatNumber';

import CarsListToolbar from './blocks/CarsListToolbar';
import CarsListForm from './blocks/CarsListForm';

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
  formContainer: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

function CarsListPage(props) {
  const styles = useStyles();
  const {
    carsList: { data, ...statuses },
    dispatch,
  } = props;

  const [openImportForm, toggleImportForm] = useState(false);

  const handleOpenImportForm = () => toggleImportForm(true);

  const handleCloseImportForm = useCallback(() => {
    toggleImportForm(false);
  }, []);

  useEffect(() => {
    dispatch(carsListActions.getCarsList());
  }, [dispatch]);

  useEffect(() => {
    if (statuses.reload && !statuses.loading) {
      dispatch(carsListActions.getCarsList());
      handleCloseImportForm();
    }
  }, [dispatch, handleCloseImportForm, statuses.loading, statuses.reload]);

  const handleCloseError = () => {
    dispatch(carsListActions.clearError());
  };

  const handleSubmitForm = files => {
    dispatch(carsListActions.uploadFile(files[0]));
  };

  const renderFormattedPrice = text => `${formatNumber(text)} ₽`;

  return (
    <div className={styles.root}>
      <CarsListToolbar onOpenImportForm={handleOpenImportForm} />
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
                    id: 'created_at',
                    text: 'Дата создания',
                  },
                  {
                    id: 'updated_at',
                    text: 'Дата изменения',
                  },
                ]}
                list={data}
                statuses={statuses}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <Drawer
        anchor="right"
        open={openImportForm}
        classes={{
          paper: styles.formContainer,
        }}
        onClose={handleCloseImportForm}
      >
        <CarsListForm
          texts={{
            title: 'Загрузка данных',
            submit: 'Загрузить',
          }}
          statuses={statuses}
          onCancel={handleCloseImportForm}
          onSubmit={handleSubmitForm}
          onCloseError={handleCloseError}
        />
      </Drawer>
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
    carsList: state.dealer.carsList,
  };
};

export default connect(mapStateToProps)(CarsListPage);
