import {
  DEALER_CARS_FETCH_START,
  DEALER_CARS_FETCH_END,
  DEALER_CARS_FETCH_ERROR,
  DEALER_CARS_ITEM_DELETED,
} from '../types';

import { adminDealerCarsRequests } from '../../../../../api';

export default function deleteDealerCar(id) {
  return async dispatch => {
    try {
      dispatch({ type: DEALER_CARS_FETCH_START });

      const { error } = await adminDealerCarsRequests.deleteCar(id);

      if (error) {
        dispatch({ type: DEALER_CARS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALER_CARS_ITEM_DELETED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALER_CARS_FETCH_ERROR,
        data: { message: 'Ошибка удаления автомобиля' },
      });
    } finally {
      dispatch({ type: DEALER_CARS_FETCH_END });
    }
  };
}
