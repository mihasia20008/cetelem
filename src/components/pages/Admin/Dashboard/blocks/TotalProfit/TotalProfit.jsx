import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
}));

const TotalProfit = props => {
  const { className, ...rest } = props;

  const styles = useStyles();

  return (
    <Card {...rest} className={cls(styles.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={styles.title} color="inherit" gutterBottom variant="body2">
              Всего продаж
            </Typography>
            <Typography color="inherit" variant="h3">
              $23,200
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={styles.avatar}>
              <AttachMoneyIcon className={styles.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
};

TotalProfit.defaultProps = {
  className: undefined,
};

export default TotalProfit;
