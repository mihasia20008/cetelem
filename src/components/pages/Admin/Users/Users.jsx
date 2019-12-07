import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Drawer, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import _get from 'lodash/get';

import { getUsers, clearError } from '../../../../redux/modules/users/actions';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';

import UsersToolbar from './blocks/UsersToolbar';

import { ROLES } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  inner: {
    minWidth: 1050,
  },
  formContainer: {
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  }
}));

function UsersPage(props) {
  const { users, dispatch } = props;
  const styles = useStyles();

  const [openCreateForm, toggleCreateForm] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const handleOpenCreateForm = () => toggleCreateForm(true);

  const handleCloseCreateForm = () => toggleCreateForm(false);

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

  const renderUserRegistration = (date = new Date()) => {
    const dateInstance = new Date(date);
    const day = dateInstance
      .getDate()
      .toString()
      .padStart(2, '0');

    const month = (dateInstance.getMonth() + 1).toString().padStart(2, '0');

    return `${day}.${month}.${date.getFullYear()}`;
  };

  const { data, ...statuses } = users;

  return (
    <div className={styles.root}>
      <UsersToolbar onOpenCreateForm={handleOpenCreateForm} />
      <div className={styles.content}>
        <Card>
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
                statuses={statuses}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <Drawer
        anchor="right"
        open={openCreateForm}
        classes={{
          paper: styles.formContainer
        }}
        onClose={handleCloseCreateForm}>
        Create Form
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
    users: state.admin.users,
  };
};

export default connect(mapStateToProps)(UsersPage);
