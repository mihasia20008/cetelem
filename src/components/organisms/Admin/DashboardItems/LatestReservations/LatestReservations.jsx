import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Bar } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import palette from '../../../../../App/theme/palette';
import formatDate from '../../../../../utilities/formatDate';

import { options } from './chart';

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

const dataSetting = {
  labels: [],
  datasets: [
    {
      label: 'На этой неделе',
      backgroundColor: palette.primary.main,
      data: [],
    },
    {
      label: 'На прошлой неделе',
      backgroundColor: palette.neutral,
      data: [],
    },
  ],
};

const daysMap = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб'];

const LatestReservations = props => {
  const { className, books = {}, href } = props;

  const styles = useStyles();

  const map = Object.entries(books).reverse();
  const thisWeek = map.slice(0, 7);
  const lastWeek = map.slice(7, 14);
  const result = thisWeek.reduce(
    (acc, [date, value], index) => {
      acc.thisWeek.unshift(value);
      acc.lastWeek.unshift(lastWeek[index][1]);
      acc.labels.unshift(`${daysMap[new Date(date).getDay()]}, ${formatDate(date, false)}`);

      return acc;
    },
    { thisWeek: [], lastWeek: [], labels: [] }
  );

  dataSetting.labels = result.labels;
  dataSetting.datasets[0].data = result.thisWeek;
  dataSetting.datasets[1].data = result.lastWeek;

  return (
    <Card className={cls(styles.root, className)}>
      <CardHeader title="График бронирований" />
      <Divider />
      <CardContent>
        <div className={styles.chartContainer}>
          <Bar data={dataSetting} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={styles.actions}>
        <Button color="primary" size="small" variant="text" href={href}>
          Смотреть все <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestReservations.propTypes = {
  className: PropTypes.string,
};

LatestReservations.defaultProps = {
  className: undefined,
};

export default LatestReservations;
