import {
  CARS_FETCH_START,
  CARS_FETCH_END,
  CARS_FETCH_ERROR,
  CARS_ITEM_DELETED,
} from '../types';

import { adminCarsRequests } from '../../../../../api';

export default function deleteCar(id) {
  return async dispatch => {
    try {
      dispatch({ type: CARS_FETCH_START });

      const { error } = await adminCarsRequests.deleteCar(id);

      if (error) {
        dispatch({ type: CARS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: CARS_ITEM_DELETED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: CARS_FETCH_ERROR,
        data: { message: 'Ошибка удаления автомобиля' },
      });
    } finally {
      dispatch({ type: CARS_FETCH_END });
    }
  };
}
