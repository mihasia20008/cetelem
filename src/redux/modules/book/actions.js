import { carsRequests } from '../../../api';

import * as T from './types';

import { CLIENT_ID_KEY } from '../../../constants';

export function bookCar(id, form) {
  return async dispatch => {
    try {
      dispatch({ type: T.BOOK_FETCH_START });

      const client = localStorage.getItem(CLIENT_ID_KEY);
      const preparedForm = {
        client_id: client,
        name: form.name,
        phone: form.phone,
        car_vin: form.vin,
      };
      const { error, data } = await carsRequests.bookCar(id, preparedForm);

      if (error) {
        dispatch({ type: T.BOOK_FETCH_ERROR, data: error });
        return null;
      }

      dispatch({ type: T.BOOK_SUCCESS, data });
      return data.dealer_id;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: T.BOOK_FETCH_ERROR,
        data: { message: 'Ошибка бронирования автомобиля' },
      });
      return null;
    } finally {
      dispatch({ type: T.BOOK_FETCH_END });
    }
  };
}

export function resetToInitial() {
  return {
    type: T.BOOK_RESET,
  };
}
