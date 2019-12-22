import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import _get from 'lodash/get';

import { Card, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import * as carsActions from '../../../../redux/modules/admin/cars/actions';

import formatDate from '../../../../utilities/formatDate';

import PageLoading from '../../../../routes/PageLoading';
import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';
import ConfirmDialog from '../../../organisms/Admin/ConfirmDialog';

import CarsToolbar from './blocks/CarsToolbar';
import CarForm from './blocks/CarForm';

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

function CarsPage(props) {
  const {
    cars: { data, meta, ...statuses },
    location,
    dispatch,
  } = props;
  const styles = useStyles();

  const [searchText, onChangeSearchText] = useState('');
  const [openCarForm, toggleCarForm] = useState(false);
  const [editingCar, setCarEdit] = useState({ id: null });
  const [deletingCarId, setCarDelete] = useState(null);

  const handleOpenCarForm = () => toggleCarForm(true);

  const handleCloseCarForm = useCallback(() => {
    if (editingCar.id) {
      setCarEdit({ id: null });
    }
    toggleCarForm(false);
  }, [editingCar.id]);

  useEffect(() => {
    dispatch(carsActions.getCars(location.query));
  }, [dispatch, location.query]);

  useEffect(() => {
    if (statuses.reload && !statuses.loading) {
      dispatch(carsActions.getCars(location.query));
      handleCloseCarForm();
    }
  }, [dispatch, handleCloseCarForm, location.query, statuses.loading, statuses.reload]);

  useEffect(() => {
    if (editingCar.id) {
      handleOpenCarForm();
    }
  }, [editingCar.id]);

  const handleCloseError = () => {
    dispatch(carsActions.clearError());
  };

  const handleSubmitForm = values => {
    if (editingCar.id) {
      dispatch(carsActions.updateCar(editingCar.id, values));
    } else {
      dispatch(carsActions.createCar(values));
    }
  };

  const handleSearch = event => {
    event.persist();
    onChangeSearchText(event.target.value);
  };

  const handleEditCar = id => {
    const car = data.find(item => item.id === id);
    if (car) {
      setCarEdit(car);
    }
  };

  const handleDeleteCar = id => setCarDelete(id);

  const handleCancelDelete = () => setCarDelete(null);

  const handleConfirmDelete = () => {
    dispatch(carsActions.deleteCar(deletingCarId));
    setCarDelete(null);
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

  if (!openCarForm && (statuses.initial || statuses.loading)) {
    return <PageLoading />;
  }

  return (
    <div className={styles.root}>
      <CarsToolbar
        searchText={searchText}
        onSearch={handleSearch}
        onOpenCreateForm={handleOpenCarForm}
      />
      <div className={styles.content}>
        <Card className={styles.wrapper}>
          <PerfectScrollbar>
            <div className={styles.inner}>
              <SimpleTable
                paginateOnServer
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
                    id: 'created_at',
                    text: 'Дата создания',
                    formatter: formatDate,
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
                meta={meta}
                statuses={openCarForm ? {} : statuses}
                onEdit={handleEditCar}
                onDelete={handleDeleteCar}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <Drawer
        anchor="right"
        open={openCarForm}
        classes={{
          paper: styles.formContainer,
        }}
        onClose={handleCloseCarForm}
      >
        <CarForm
          texts={
            editingCar.id
              ? {
                  title: 'Редактирование автомобиля',
                  subtitle: 'Заполните все обязательные поля',
                  submit: 'Изменить',
                }
              : {
                  title: 'Создание автомобиля',
                  subtitle: 'Заполните все обязательные поля',
                  submit: 'Создать',
                }
          }
          car={editingCar}
          statuses={statuses}
          onCancel={handleCloseCarForm}
          onSubmit={handleSubmitForm}
          onCloseError={handleCloseError}
        />
      </Drawer>
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
        open={Boolean(statuses.error) && !openCarForm}
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
