import _omitBy from 'lodash/omitBy';

import {
  CARS_FETCH_START,
  CARS_FETCH_END,
  CARS_FETCH_ERROR,
  CARS_ITEM_UPDATED,
} from '../types';

import { adminCarsRequests } from '../../../../../api';

export default function updateCar(id, values) {
  return async dispatch => {
    try {
      dispatch({ type: CARS_FETCH_START });

      const form = _omitBy(values, value => !value);
      const years = `${form.yearStart} - ${form.yearEnd || 'по н.в.'}`;
      const preparedForm = {
        mark: form.mark,
        model: form.model,
        modification: form.modification,
        body_type: form.body_type,
        complectation: form.complectation === undefined ? null : form.complectation,
        years,
      };

      const { error } = await adminCarsRequests.updateCar(id, preparedForm);

      if (error) {
        dispatch({ type: CARS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: CARS_ITEM_UPDATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: CARS_FETCH_ERROR,
        data: { message: 'Ошибка изменения автомобиля' },
      });
    } finally {
      dispatch({ type: CARS_FETCH_END });
    }
  };
}
