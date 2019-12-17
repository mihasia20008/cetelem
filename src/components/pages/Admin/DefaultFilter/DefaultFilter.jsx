import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

import _get from 'lodash/get';

import * as defaultFilterActions from '../../../../redux/modules/admin/filtersDefault/actions';
import * as filtersActions from '../../../../redux/modules/filters/actions';

import PageLoading from '../../../../routes/PageLoading';
import FilterForm from './FilterForm';
import ConfirmDialog from '../../../organisms/Admin/ConfirmDialog';

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

function DefaultFilterPage(props) {
  const {
    defaultFilter: { data, ...statuses },
    filters,
    dispatch,
  } = props;
  const styles = useStyles();
  const [submitting, setSubmit] = useState(false);
  const [deletingFilterId, setFilterDelete] = useState(null);

  useEffect(() => {
    dispatch(defaultFilterActions.getFilter()).then(defaultFilter => {
      dispatch(
        filtersActions.getCarFilter({
          loadMarks: true,
          markId: _get(defaultFilter, 'data.mark_id', 0),
          loadModels: Boolean(defaultFilter),
        })
      );
      dispatch(filtersActions.getBase());
    });
  }, [dispatch]);

  useEffect(() => {
    if (statuses.reload && !statuses.loading) {
      dispatch(defaultFilterActions.getFilter()).then(() => {
        dispatch(filtersActions.getCarFilter({ loadMarks: true }));
      });
      setSubmit(false);
    }
  }, [dispatch, statuses.loading, statuses.reload]);

  const handleCloseError = () => {
    dispatch(defaultFilterActions.clearError());
  };

  const handleSubmitForm = values => {
    setSubmit(true);
    if (data.id) {
      dispatch(defaultFilterActions.updateFilter(data.id, values));
    } else {
      dispatch(defaultFilterActions.createFilter(values));
    }
  };

  const handleUpdateCar = markId => {
    if (markId > 0) {
      dispatch(filtersActions.getCarFilter({ markId, loadMarks: false, loadModels: true }));
      return;
    }
    if (markId === -1) {
      dispatch(filtersActions.getCarFilter({ loadMarks: true }));
    }
  };

  const handleDeleteFilter = () => setFilterDelete(data.id);

  const handleCancelDelete = () => setFilterDelete(null);

  const handleConfirmDelete = () => {
    dispatch(defaultFilterActions.deleteFilter(deletingFilterId));
    setFilterDelete(null);
  };

  if (!submitting && statuses.error) {
    return <div>Error {JSON.stringify(statuses.error)}</div>;
  }

  if (
    statuses.reload ||
    statuses.loading ||
    !statuses.success ||
    filters.base.initial ||
    filters.base.loading ||
    !filters.base.success
  ) {
    return <PageLoading />;
  }

  return (
    <div className={styles.root}>
      <FilterForm
        texts={{
          title: 'Фильтр по умолчанию',
          submit: 'Сохранить',
          cancel: 'Очистить',
        }}
        defaultFilter={data}
        filters={filters}
        statuses={statuses}
        onSubmit={handleSubmitForm}
        onCloseError={handleCloseError}
        onUpdateCar={handleUpdateCar}
        onDeleteFilter={handleDeleteFilter}
      />
      <ConfirmDialog
        open={Boolean(deletingFilterId)}
        texts={{
          title: 'Удаление записи',
          body: (
            <>
              Вы собираетесь очистить фильтр по умолчанию.
              <br />
              <b>Данное действие невозможно отменить.</b> Хотите продолжить?
            </>
          ),
          cancel: 'Отмена',
          confirm: 'Очистить',
        }}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    defaultFilter: state.admin.filtersDefault,
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(DefaultFilterPage);
