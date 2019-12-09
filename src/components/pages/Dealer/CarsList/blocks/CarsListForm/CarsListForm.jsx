import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import _get from 'lodash/get';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ErrorShower from '../../../../../organisms/Admin/ErrorShower';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    overflowY: 'scroll',
  },
  actionsWrap: {
    justifyContent: 'flex-end',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  confirmWrap: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
  filesList: {
    marginTop: '32px',
  },
  fileItem: {
    paddingLeft: '8px',
  },
}));

function CarsListForm(props) {
  const { texts, statuses, onCancel, onSubmit, onCloseError } = props;
  const styles = useStyles();
  const [isValid, setValid] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'text/xml',
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [acceptedFiles]);

  const handleSubmitForm = event => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    onSubmit(acceptedFiles);
  };

  return (
    <Card className={styles.root}>
      <form autoComplete="off" noValidate onSubmit={handleSubmitForm}>
        <CardHeader subheader={texts.subtitle} title={texts.title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} />
                <p>Перетащите файлы сюда или нажмите, чтобы выбрать на устройстве</p>
              </div>
              {acceptedFiles.length ? (
                <div className={styles.filesList}>
                  Выбрано:
                  {acceptedFiles.map(file => (
                    <p className={styles.fileItem} key={file.path}>
                      <b>{file.path}</b> - {file.size} bytes
                    </p>
                  ))}
                </div>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={styles.actionsWrap}>
          <div className={styles.confirmWrap}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!isValid || statuses.loading}
            >
              {texts.submit}
            </Button>
            {statuses.loading && <CircularProgress size={24} className={styles.buttonProgress} />}
          </div>
          <Button color="primary" variant="outlined" onClick={onCancel}>
            Отмена
          </Button>
        </CardActions>
      </form>
      <ErrorShower
        open={Boolean(statuses.error)}
        message={_get(statuses, 'error.message')}
        onClose={onCloseError}
        position={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </Card>
  );
}

CarsListForm.propTypes = {
  texts: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseError: PropTypes.func.isRequired,
};

export default CarsListForm;
