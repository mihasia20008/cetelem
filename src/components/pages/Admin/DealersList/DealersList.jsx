import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Drawer, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import _get from 'lodash/get';

import * as dealersActions from '../../../../redux/modules/admin/dealersList/actions';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';
import ConfirmDialog from '../../../organisms/Admin/ConfirmDialog';

import DealersToolbar from './blocks/DealersToolbar';
import DealerForm from './blocks/DealerForm';

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

function DealersListPage(props) {
  const {
    dealers: { data, ...statuses },
    dispatch,
  } = props;
  const styles = useStyles();

  const [openDealerForm, toggleDealerForm] = useState(false);
  const [editingDealer, setDealerEdit] = useState({ id: null });
  const [deletingDealerId, setDealerDelete] = useState(null);

  const handleOpenDealerForm = () => toggleDealerForm(true);

  const handleCloseDealerForm = useCallback(() => {
    if (editingDealer.id) {
      setDealerEdit({ id: null });
    }
    toggleDealerForm(false);
  }, [editingDealer.id]);

  useEffect(() => {
    dispatch(dealersActions.getDealers());
  }, [dispatch]);

  useEffect(() => {
    if (statuses.reload && !statuses.loading) {
      dispatch(dealersActions.getDealers());
      handleCloseDealerForm();
    }
  }, [dispatch, handleCloseDealerForm, statuses.loading, statuses.reload]);

  useEffect(() => {
    if (editingDealer.id) {
      handleOpenDealerForm();
    }
  }, [editingDealer.id]);

  const handleCloseError = () => {
    dispatch(dealersActions.clearError());
  };

  const handleSubmitForm = values => {
    if (editingDealer.id) {
      dispatch(dealersActions.updateDealer(editingDealer.id, values));
    } else {
      dispatch(dealersActions.createDealer(values));
    }
  };

  const handleEditDealer = id => {
    const dealer = data.find(item => item.id === id);
    if (dealer) {
      setDealerEdit(dealer);
    }
  };

  const handleDeleteDealer = id => setDealerDelete(id);

  const handleCancelDelete = () => setDealerDelete(null);

  const handleConfirmDelete = () => {
    dispatch(dealersActions.deleteDealer(deletingDealerId));
    setDealerDelete(null);
  };

  // const renderUserRole = role => {
  //   switch (role) {
  //     case ROLES.ADMIN: {
  //       return 'Администратор';
  //     }
  //     case ROLES.DEALER: {
  //       return 'Дилер';
  //     }
  //     default: {
  //       return 'Пользователь';
  //     }
  //   }
  // };
  //
  // const renderUserDealer = (id, user) => {
  //   if (user.role === ROLES.ADMIN) {
  //     return '';
  //   }
  //
  //   const dealer = dealers.find(item => item.id === id) || [];
  //   return dealer.name || 'Не определено';
  // };
  //
  // const renderUserRegistration = (date = new Date()) => {
  //   const dateInstance = new Date(date);
  //   const day = dateInstance
  //     .getDate()
  //     .toString()
  //     .padStart(2, '0');
  //
  //   const month = (dateInstance.getMonth() + 1).toString().padStart(2, '0');
  //
  //   return `${day}.${month}.${date.getFullYear()}`;
  // };

  return (
    <div className={styles.root}>
      <DealersToolbar onOpenCreateForm={handleOpenDealerForm} />
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
                    id: 'name',
                    text: 'Название',
                    formatter: text => <Typography variant="body1">{text}</Typography>,
                  },
                  {
                    id: 'address',
                    text: 'Адрес',
                    // formatter: renderUserRole,
                  },
                  {
                    id: 'phone',
                    text: 'Телефон',
                    // formatter: renderUserDealer,
                  },
                  {
                    id: 'date',
                    text: 'Дата регистрации',
                    // formatter: renderUserRegistration,
                  },
                  {
                    id: ACTIONS_COLUMN_ID,
                    text: '',
                  },
                ]}
                list={data}
                statuses={openDealerForm ? {} : statuses}
                onEdit={handleEditDealer}
                onDelete={handleDeleteDealer}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <Drawer
        anchor="right"
        open={openDealerForm}
        classes={{
          paper: styles.formContainer,
        }}
        onClose={handleCloseDealerForm}
      >
        <DealerForm
          texts={editingDealer.id ? {
            title: 'Редактирование дилера',
            subtitle: 'Заполните все обязательные поля',
            submit: 'Изменить',
          } : {
            title: 'Создание дилера',
            subtitle: 'Заполните все обязательные поля',
            submit: 'Создать',
          }}
          dealer={editingDealer}
          statuses={statuses}
          onCancel={handleCloseDealerForm}
          onSubmit={handleSubmitForm}
          onCloseError={handleCloseError}
        />
      </Drawer>
      <ConfirmDialog
        open={Boolean(deletingDealerId)}
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
        open={Boolean(statuses.error) && !openDealerForm}
        message={_get(statuses, 'error.message')}
        onClose={handleCloseError}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    dealers: state.admin.dealersList,
  };
};

export default connect(mapStateToProps)(DealersListPage);
