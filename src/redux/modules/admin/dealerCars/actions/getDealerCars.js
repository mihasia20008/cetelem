import {
  DEALER_CARS_FETCH_START,
  DEALER_CARS_FETCH_END,
  DEALER_CARS_FETCH_ERROR,
  DEALER_CARS_LIST_LOADED,
} from '../types';

import { adminDealerCarsRequests } from '../../../../../api';

export default function getDealerCars() {
  return async dispatch => {
    try {
      dispatch({ type: DEALER_CARS_FETCH_START });

      const { error, data } = await adminDealerCarsRequests.getList();

      if (error) {
        dispatch({ type: DEALER_CARS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALER_CARS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALER_CARS_FETCH_ERROR,
        data: { message: 'Ошибка получения списка выгрузок автомобилей' },
      });
    } finally {
      dispatch({ type: DEALER_CARS_FETCH_END });
    }
  };
}
