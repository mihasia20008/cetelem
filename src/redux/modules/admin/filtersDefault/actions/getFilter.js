import {
  DEFAULT_FILTER_FETCH_START,
  DEFAULT_FILTER_FETCH_END,
  DEFAULT_FILTER_FETCH_ERROR,
  DEFAULT_FILTER_DATA_LOADED,
} from '../types';

import { adminDefaultFilterRequests } from '../../../../../api';

export default function getDefaultFilter() {
  return async dispatch => {
    try {
      dispatch({ type: DEFAULT_FILTER_FETCH_START });

      const { error: listError, data: listData } = await adminDefaultFilterRequests.getList();

      if (listError) {
        dispatch({ type: DEFAULT_FILTER_FETCH_ERROR, data: listError });
        return null;
      }

      if (!listData.length) {
        dispatch({ type: DEFAULT_FILTER_DATA_LOADED, data: {} });
        return null;
      }

      const { error: itemError, data } = await adminDefaultFilterRequests.getFilter(listData[0].id);

      if (itemError) {
        dispatch({ type: DEFAULT_FILTER_FETCH_ERROR, data: itemError });
        return null;
      }

      dispatch({ type: DEFAULT_FILTER_DATA_LOADED, data });
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEFAULT_FILTER_FETCH_ERROR,
        data: { message: 'Ошибка получения информации о фильтре' },
      });
      return null;
    } finally {
      dispatch({ type: DEFAULT_FILTER_FETCH_END });
    }
  };
}
