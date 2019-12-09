import _omitBy from 'lodash/omitBy';

import {
  DEALERS_FETCH_START,
  DEALERS_FETCH_END,
  DEALERS_FETCH_ERROR,
  DEALERS_ITEM_UPDATED,
} from '../types';

import { adminDealersRequests } from '../../../../../api';

export default function updateDealer(id, values) {
  return async dispatch => {
    try {
      dispatch({ type: DEALERS_FETCH_START });

      const form = _omitBy(values, value => !value);
      const { error } = await adminDealersRequests.updateDealer(id, form);

      if (error) {
        dispatch({ type: DEALERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALERS_ITEM_UPDATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALERS_FETCH_ERROR,
        data: { message: 'Ошибка изменения дилера' },
      });
    } finally {
      dispatch({ type: DEALERS_FETCH_END });
    }
  };
}
