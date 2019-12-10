import {
  DEALER_INFO_FETCH_START,
  DEALER_INFO_FETCH_END,
  DEALER_INFO_FETCH_ERROR,
  DEALER_INFO_DATA_LOADED,
} from '../types';

import { dealerInfoRequests } from '../../../../../api';

import { DEALER_ID_KEY } from '../../../../../constants';

export default function getDealerInfo(dealer) {
  return async dispatch => {
    try {
      dispatch({ type: DEALER_INFO_FETCH_START });

      const id = dealer || localStorage.getItem(DEALER_ID_KEY);
      const { error, data } = await dealerInfoRequests.getInfo(id);

      if (error) {
        dispatch({ type: DEALER_INFO_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALER_INFO_DATA_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALER_INFO_FETCH_ERROR,
        data: { message: 'Ошибка получения информации о дилере' },
      });
    } finally {
      dispatch({ type: DEALER_INFO_FETCH_END });
    }
  };
}
