import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

import * as dealerInfoActions from '../../../../redux/modules/dealer/info/actions';

import PageLoading from '../../../../routes/PageLoading';
import PersonalForm from './PersonalForm';

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

function PersonalPage(props) {
  const {
    info: { data, ...statuses },
    dispatch,
  } = props;
  const styles = useStyles();
  const [submitting, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(dealerInfoActions.getDealerInfo());
  }, [dispatch]);

  useEffect(() => {
    if (statuses.reload && !statuses.loading) {
      dispatch(dealerInfoActions.getDealerInfo());
      setSubmit(false);
    }
  }, [dispatch, statuses.loading, statuses.reload]);

  const handleCloseError = () => {
    dispatch(dealerInfoActions.clearError());
  };

  const handleSubmitForm = values => {
    setSubmit(true);
    dispatch(dealerInfoActions.updateDealer(data.id, values));
  };

  if (!submitting && statuses.error) {
    return <div>Error {JSON.stringify(statuses.error)}</div>;
  }

  if (!statuses.success) {
    return <PageLoading />;
  }

  return (
    <div className={styles.root}>
      <PersonalForm
        texts={{
          title: 'Редактирование информации',
          submit: 'Изменить',
        }}
        dealer={data}
        statuses={statuses}
        onSubmit={handleSubmitForm}
        onCloseError={handleCloseError}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    info: state.dealer.info,
  };
};

export default connect(mapStateToProps)(PersonalPage);
