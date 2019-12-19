import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Bar } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data, options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const LatestSales = props => {
  const { className, ...rest } = props;

  const styles = useStyles();

  return (
    <Card {...rest} className={cls(styles.root, className)}>
      <CardHeader title="График бронирований" />
      <Divider />
      <CardContent>
        <div className={styles.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={styles.actions}>
        <Button color="primary" size="small" variant="text">
          Смотреть все <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string,
};

LatestSales.defaultProps = {
  className: undefined,
};

export default LatestSales;
