import {
  CARS_LIST_FETCH_START,
  CARS_LIST_FETCH_END,
  CARS_LIST_FETCH_ERROR,
  CARS_LIST_LOADED,
} from '../types';

import { dealerCarsListRequests } from '../../../../../api';

import { USER_ID_KEY } from "../../../../../constants";

export default function getCarsList() {
  return async dispatch => {
    try {
      dispatch({ type: CARS_LIST_FETCH_START });

      const id = localStorage.getItem(USER_ID_KEY);
      const { error, data } = await dealerCarsListRequests.getList(id);

      if (error) {
        dispatch({ type: CARS_LIST_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: CARS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: CARS_LIST_FETCH_ERROR,
        data: { message: 'Ошибка получения списка автомобилей' },
      });
    } finally {
      dispatch({ type: CARS_LIST_FETCH_END });
    }
  };
}
