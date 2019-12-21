import { filtersRequests } from '../../../../api';

import * as T from '../types';

export default function getBaseFilters() {
  return async dispatch => {
    try {
      dispatch({ type: T.FILTERS_DEAFULT_FETCH_START });
      const { error, data } = await filtersRequests.getDefaultList();

      if (error) {
        dispatch({ type: T.FILTERS_DEAFULT_FETCH_ERROR, data: error });
        return {};
      }

      dispatch({ type: T.FILTERS_DEAFULT_SUCCESS_LOADED, data });
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: T.FILTERS_DEAFULT_FETCH_ERROR,
        data: { message: 'Ошибка получения данных с сервера' },
      });
      return {};
    } finally {
      dispatch({ type: T.FILTERS_DEAFULT_FETCH_END });
    }
  };
}
