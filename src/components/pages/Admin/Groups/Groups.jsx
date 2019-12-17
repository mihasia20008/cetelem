import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Drawer, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import _get from 'lodash/get';

import * as groupsActions from '../../../../redux/modules/admin/groups/actions';

import formatDate from '../../../../utilities/formatDate';

import SimpleTable, { ACTIONS_COLUMN_ID } from '../../../organisms/Admin/SimpleTable';
import ErrorShower from '../../../organisms/Admin/ErrorShower';
import ConfirmDialog from '../../../organisms/Admin/ConfirmDialog';

import GroupsToolbar from './blocks/GroupsToolbar';
import GroupForm from './blocks/GroupForm';


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

function GroupsPage(props) {
  const {
    dealersGroups: { data, ...statuses },
    dispatch,
  } = props;
  const styles = useStyles();

  const [openGroupForm, toggleGroupForm] = useState(false);
  const [editingGroup, setGroupEdit] = useState({ id: null });
  const [deletingGroupId, setGroupDelete] = useState(null);

  const handleOpenGroupForm = () => toggleGroupForm(true);

  const handleCloseGroupForm = useCallback(() => {
    if (editingGroup.id) {
      setGroupEdit({ id: null });
    }
    toggleGroupForm(false);
  }, [editingGroup.id]);

  useEffect(() => {
    dispatch(groupsActions.getGroups());
  }, [dispatch]);

  useEffect(() => {
    if (statuses.reload && !statuses.loading) {
      dispatch(groupsActions.getGroups());
      handleCloseGroupForm();
    }
  }, [dispatch, handleCloseGroupForm, statuses.loading, statuses.reload]);

  useEffect(() => {
    if (editingGroup.id) {
      handleOpenGroupForm();
    }
  }, [editingGroup.id]);

  const handleCloseError = () => {
    dispatch(groupsActions.clearError());
  };

  const handleSubmitForm = values => {
    if (editingGroup.id) {
      dispatch(groupsActions.updateGroup(editingGroup.id, values));
    } else {
      dispatch(groupsActions.createGroup(values));
    }
  };

  const handleEditGroup = id => {
    const group = data.find(item => item.id === id);
    if (group) {
      setGroupEdit(group);
    }
  };

  const handleDeleteGroup = id => setGroupDelete(id);

  const handleCancelDelete = () => setGroupDelete(null);

  const handleConfirmDelete = () => {
    dispatch(groupsActions.deleteGroup(deletingGroupId));
    setGroupDelete(null);
  };

  return (
    <div className={styles.root}>
      <GroupsToolbar onOpenCreateForm={handleOpenGroupForm} />
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
                list={data}
                statuses={openGroupForm ? {} : statuses}
                onEdit={handleEditGroup}
                onDelete={handleDeleteGroup}
              />
            </div>
          </PerfectScrollbar>
        </Card>
      </div>
      <Drawer
        anchor="right"
        open={openGroupForm}
        classes={{
          paper: styles.formContainer,
        }}
        onClose={handleCloseGroupForm}
      >
        <GroupForm
          texts={editingGroup.id ? {
            title: 'Редактирование группы дилеров',
            subtitle: 'Заполните все обязательные поля',
            submit: 'Изменить',
          } : {
            title: 'Создание группы дилеров',
            subtitle: 'Заполните все обязательные поля',
            submit: 'Создать',
          }}
          group={editingGroup}
          statuses={statuses}
          onCancel={handleCloseGroupForm}
          onSubmit={handleSubmitForm}
          onCloseError={handleCloseError}
        />
      </Drawer>
      <ConfirmDialog
        open={Boolean(deletingGroupId)}
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
        open={Boolean(statuses.error) && !openGroupForm}
        message={_get(statuses, 'error.message')}
        onClose={handleCloseError}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    dealersGroups: state.admin.dealersGroups,
  };
};

export default connect(mapStateToProps)(GroupsPage);
