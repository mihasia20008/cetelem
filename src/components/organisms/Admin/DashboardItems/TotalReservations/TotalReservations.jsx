import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import { colors, Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import formatNumber from '../../../../../utilities/formatNumber';

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
    backgroundColor: colors.indigo[500],
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
    color: theme.palette.success.dark,
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
}));

const TotalReservations = props => {
  const { className, bookTotal } = props;

  const styles = useStyles();

  return (
    <Card className={cls(styles.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={styles.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Совершено бронирований
            </Typography>
            <Typography variant="h3">{formatNumber(bookTotal)}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={styles.avatar}>
              <ShoppingCartIcon className={styles.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {/* <div className={styles.difference}> */}
        {/*  <ArrowUpwardIcon className={styles.differenceIcon} /> */}
        {/*  <Typography className={styles.differenceValue} variant="body2"> */}
        {/*    16% */}
        {/*  </Typography> */}
        {/*  <Typography className={styles.caption} variant="caption"> */}
        {/*    С прошлого месяца */}
        {/*  </Typography> */}
        {/* </div> */}
      </CardContent>
    </Card>
  );
};

TotalReservations.propTypes = {
  className: PropTypes.string,
  bookTotal: PropTypes.number,
};

TotalReservations.defaultProps = {
  className: undefined,
  bookTotal: 0,
};

export default TotalReservations;
