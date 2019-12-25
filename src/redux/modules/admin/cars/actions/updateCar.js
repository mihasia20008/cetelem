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
        years,
        engine_type: form.engine_type === undefined ? null : form.engine_type,
        engine_volume: form.engine_volume === undefined ? null : form.engine_volume,
        engine_hp: form.engine_hp === undefined ? null : form.engine_hp,
        body_type: form.body_type === undefined ? null : form.body_type,
        doors_count: form.doors_count === undefined ? null : form.doors_count,
        drive: form.drive === undefined ? null : form.drive,
        gearbox: form.gearbox === undefined ? null : form.gearbox,
        complectation: form.complectation === undefined ? null : form.complectation,
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
