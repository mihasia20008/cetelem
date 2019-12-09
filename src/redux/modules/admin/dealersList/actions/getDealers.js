import { DEALERS_FETCH_START, DEALERS_FETCH_END, DEALERS_FETCH_ERROR, DEALERS_LIST_LOADED } from '../types';

import { adminDealersRequests } from '../../../../../api';

export default function getDealers() {
  return async dispatch => {
    try {
      dispatch({ type: DEALERS_FETCH_START });

      const { error, data } = await adminDealersRequests.getList();

      if (error) {
        dispatch({ type: DEALERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALERS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALERS_FETCH_ERROR,
        data: { message: 'Ошибка получения списка дилеров' },
      });
    } finally {
      dispatch({ type: DEALERS_FETCH_END });
    }
  };
}
