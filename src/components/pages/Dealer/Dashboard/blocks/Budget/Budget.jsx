import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

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
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const Budget = props => {
  const { className, ...rest } = props;

  const styles = useStyles();

  return (
    <Card {...rest} className={cls(styles.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={styles.title} color="textSecondary" gutterBottom variant="body2">
              БЮДЖЕТ
            </Typography>
            <Typography variant="h3">$24,000</Typography>
          </Grid>
          <Grid item>
            <Avatar className={styles.avatar}>
              <MoneyIcon className={styles.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={styles.difference}>
          <ArrowDownwardIcon className={styles.differenceIcon} />
          <Typography className={styles.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography className={styles.caption} variant="caption">
            С прошлого месяца
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

Budget.defaultProps = {
  className: undefined,
};

export default Budget;
