import {
  CARS_LIST_FETCH_START,
  CARS_LIST_FETCH_END,
  CARS_LIST_FETCH_ERROR,
  CARS_LIST_XML_UPLOADED,
} from '../types';

import { dealerCarsListRequests } from '../../../../../api';

import { DEALER_ID_KEY } from "../../../../../constants";

export default function uploadFile(file) {
  return async dispatch => {
    try {
      dispatch({ type: CARS_LIST_FETCH_START });

      const id = localStorage.getItem(DEALER_ID_KEY);
      const { error } = await dealerCarsListRequests.uploadFile(id, file);

      if (error) {
        dispatch({ type: CARS_LIST_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: CARS_LIST_XML_UPLOADED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: CARS_LIST_FETCH_ERROR,
        data: { message: 'Ошибка загрузки файла с выгрузкой' },
      });
    } finally {
      dispatch({ type: CARS_LIST_FETCH_END });
    }
  };
}
