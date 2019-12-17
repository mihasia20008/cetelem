import {
  DEFAULT_FILTER_FETCH_START,
  DEFAULT_FILTER_FETCH_END,
  DEFAULT_FILTER_FETCH_ERROR,
  DEFAULT_FILTER_DATA_UPDATED,
} from '../types';

import { adminDefaultFilterRequests } from '../../../../../api';

export default function deleteFilter(id) {
  return async dispatch => {
    try {
      dispatch({ type: DEFAULT_FILTER_FETCH_START });

      const { error } = await adminDefaultFilterRequests.deleteFilter(id);

      if (error) {
        dispatch({ type: DEFAULT_FILTER_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEFAULT_FILTER_DATA_UPDATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEFAULT_FILTER_FETCH_ERROR,
        data: { message: 'Ошибка изменения фильтра' },
      });
    } finally {
      dispatch({ type: DEFAULT_FILTER_FETCH_END });
    }
  };
}
