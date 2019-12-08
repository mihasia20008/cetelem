import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, LinearProgress } from '@material-ui/core';

import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  progress: {
    marginTop: theme.spacing(3),
  },
}));

const TasksProgress = props => {
  const { className, ...rest } = props;

  const styles = useStyles();

  return (
    <Card {...rest} className={cls(styles.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={styles.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Прогресс по задачам
            </Typography>
            <Typography variant="h3">75.5%</Typography>
          </Grid>
          <Grid item>
            <Avatar className={styles.avatar}>
              <InsertChartIcon className={styles.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress className={styles.progress} value={75.5} variant="determinate" />
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string,
};

TasksProgress.defaultProps = {
  className: undefined,
};

export default TasksProgress;
