import _pick from 'lodash/pick';

import { carsRequests } from '../../../api';

import * as T from './types';
import { FILTER_NAMES, FILTER_TYPES } from '../../../constants';

const availableParams = ['page', 'per_page', 'sort', 'order'];
const filtersParams = Object.values(FILTER_NAMES);

export function loadCarsList(query) {
  return async (dispatch, getStore) => {
    try {
      dispatch({ type: T.CARS_FETCH_START });
      const filters = getStore().filters.data;
      const filtersQuery = _pick(query, filtersParams);
      const preparedFilters = Object.keys(filtersQuery).reduce((acc, key) => {
        if (key.search('_id') !== -1 && filtersQuery[key] > 0) {
          acc[key] = filtersQuery[key];
          return acc;
        }

        const filter = filters[key];
        if (!filter) {
          return acc;
        }

        switch (filter.type) {
          case FILTER_TYPES.CHECKBOX: {
            acc[key] = filtersQuery[key];
            break;
          }
          case FILTER_TYPES.SELECT: {
            const option = filter.options.find(
              item => item.id.toString() === filtersQuery[key].toString()
            );
            if (option) {
              acc[key] = option.name;
            }
            break;
          }
          case FILTER_TYPES.RANGE: {
            if (Array.isArray(filtersQuery[key])) {
              const [min, max] = filtersQuery[key];
              acc[`${key}[min]`] = min;
              acc[`${key}[max]`] = max;
            } else {
              acc[`${key}[min]`] = filtersQuery[key];
            }
            break;
          }
          default: {
            break;
          }
        }
        return acc;
      }, {});

      const baseQuery = _pick(query, availableParams);

      const { error, data } = await carsRequests.loadCarsList({ ...baseQuery, ...preparedFilters });

      if (error) {
        dispatch({ type: T.CARS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: T.CARS_FETCH_SUCCESS, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: T.CARS_FETCH_ERROR,
        data: { message: 'Ошибка получения списка автомобилей' },
      });
    } finally {
      dispatch({ type: T.CARS_FETCH_END });
    }
  };
}
