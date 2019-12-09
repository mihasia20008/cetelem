import {
  DEALERS_FETCH_START,
  DEALERS_FETCH_END,
  DEALERS_FETCH_ERROR,
  DEALERS_ITEM_CREATED,
} from '../types';

import { adminDealersRequests } from '../../../../../api';

export default function createDealer(form) {
  return async dispatch => {
    try {
      dispatch({ type: DEALERS_FETCH_START });

      const { error } = await adminDealersRequests.createDealer(form);

      if (error) {
        dispatch({ type: DEALERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALERS_ITEM_CREATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALERS_FETCH_ERROR,
        data: { message: 'Ошибка создания дилера' },
      });
    } finally {
      dispatch({ type: DEALERS_FETCH_END });
    }
  };
}
