import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Drawer, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import _get from 'lodash/get';

import * as usersActions from '../../../../redux/modules/admin/users/actions';
import { getDealers } from '../../../../redux/modules/filters/actions';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';
import ConfirmDialog from '../../../organisms/Admin/ConfirmDialog';

import UsersToolbar from './blocks/UsersToolbar';
import UserForm from './blocks/UserForm';

import { ROLES } from '../../../../constants';

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

function UsersPage(props) {
  const {
    users: { data, ...statuses },
    dealersLoaded,
    dealers,
    dispatch,
  } = props;
  const styles = useStyles();

  const [openUserForm, toggleUserForm] = useState(false);
  const [editingUser, setUserEdit] = useState({ id: null });
  const [deletingUserId, setUserDelete] = useState(null);

  const handleOpenUserForm = () => toggleUserForm(true);

  const handleCloseUserForm = useCallback(() => {
    if (editingUser.id) {
      setUserEdit({ id: null });
    }
    toggleUserForm(false);
  }, [editingUser.id]);

  useEffect(() => {
    dispatch(usersActions.getUsers());
    if (!dealersLoaded) {
      dispatch(getDealers());
    }
  }, [dealersLoaded, dispatch]);

  useEffect(() => {
    if (statuses.reload && !statuses.loading) {
      dispatch(usersActions.getUsers());
      handleCloseUserForm();
    }
  }, [dispatch, handleCloseUserForm, statuses.loading, statuses.reload]);

  useEffect(() => {
    if (editingUser.id) {
      handleOpenUserForm();
    }
  }, [editingUser.id]);

  const handleCloseError = () => {
    dispatch(usersActions.clearError());
  };

  const handleSubmitForm = values => {
    if (editingUser.id) {
      dispatch(usersActions.updateUser(editingUser.id, values));
    } else {
      dispatch(usersActions.createUser(values));
    }
  };

  const handleEditUser = id => {
    const user = data.find(item => item.id === id);
    if (user) {
      setUserEdit(user);
    }
  };

  const handleDeleteUser = id => setUserDelete(id);

  const handleCancelDelete = () => setUserDelete(null);

  const handleConfirmDelete = () => {
    dispatch(usersActions.deleteUser(deletingUserId));
    setUserDelete(null);
  };

  const renderUserRole = role => {
    switch (role) {
      case ROLES.ADMIN: {
        return 'Администратор';
      }
      case ROLES.DEALER: {
        return 'Дилер';
      }
      default: {
        return 'Пользователь';
      }
    }
  };

  const renderUserDealer = (id, user) => {
    if (user.role === ROLES.ADMIN) {
      return '';
    }

    const dealer = dealers.find(item => item.id === id) || [];
    return dealer.name || 'Не определено';
  };

  const renderUserRegistration = (date = new Date()) => {
    const dateInstance = new Date(date);
    const day = dateInstance
      .getDate()
      .toString()
      .padStart(2, '0');

    const month = (dateInstance.getMonth() + 1).toString().padStart(2, '0');

    return `${day}.${month}.${date.getFullYear()}`;
  };

  return (
    <div className={styles.root}>
      <UsersToolbar onOpenCreateForm={handleOpenUserForm} />
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
                    id: 'login',
                    text: 'Логин',
                    formatter: text => <Typography variant="body1">{text}</Typography>,
                  },
                  {
                    id: 'role',
                    text: 'Роль',
                    formatter: renderUserRole,
                  },
                  {
                    id: 'dealer_id',
                    text: 'Дилер',
                    formatter: renderUserDealer,
                  },
                  {
                    id: 'date',
                    text: 'Дата регистрации',
                    formatter: renderUserRegistration,
                  },
                  {
                    id: ACTIONS_COLUMN_ID,
                    text: '',
                  },
                ]}
                list={data}
                statuses={openUserForm ? {} : statuses}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <Drawer
        anchor="right"
        open={openUserForm}
        classes={{
          paper: styles.formContainer,
        }}
        onClose={handleCloseUserForm}
      >
        <UserForm
          texts={editingUser.id ? {
            title: 'Редактирование пользователя',
            subtitle: 'Заполните все обязательные поля',
            submit: 'Изменить',
          } : {
            title: 'Создание пользователя',
            subtitle: 'Заполните все обязательные поля',
            submit: 'Создать',
          }}
          user={editingUser}
          dealers={dealers}
          statuses={statuses}
          onCancel={handleCloseUserForm}
          onSubmit={handleSubmitForm}
          onCloseError={handleCloseError}
        />
      </Drawer>
      <ConfirmDialog
        open={Boolean(deletingUserId)}
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
        open={Boolean(statuses.error) && !openUserForm}
        message={_get(statuses, 'error.message')}
        onClose={handleCloseError}
      />
    </div>
  );
}

const mapStateToProps = state => {
  const dealers = _get(state, 'filters.data.dealers.options', []).filter(item => item.id !== 0);
  return {
    users: state.admin.users,
    dealers,
    dealersLoaded: _get(state, 'filters.dealer.success'),
  };
};

export default connect(mapStateToProps)(UsersPage);
