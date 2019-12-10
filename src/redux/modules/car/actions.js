import { carsRequests } from '../../../api';

import * as T from './types';

export function loadCarDetail(id) {
  return async dispatch => {
    try {
      dispatch({ type: T.CAR_FETCH_START });
      const { error, data } = await carsRequests.loadCarDetail(id);

      if (error) {
        dispatch({ type: T.CAR_FETCH_ERROR, data: error });
        return null;
      }

      dispatch({ type: T.CAR_FETCH_SUCCESS, data });
      return data.dealer_id;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: T.CAR_FETCH_ERROR,
        data: { message: 'Ошибка получения информации об автомобиле' },
      });
      return null;
    } finally {
      dispatch({ type: T.CAR_FETCH_END });
    }
  };
}

export function carsInfoLoaded() {
  return {
    type: T.CAR_INFO_LOADED,
  };
}
