import { filtersRequests } from '../../../../api';

import * as T from '../types';

export default function getDealers() {
  return async dispatch => {
    try {
      dispatch({ type: T.FILTERS_FETCH_START });
      const { error, data } = await filtersRequests.getDealersList();

      if (error) {
        dispatch({ type: T.FILTERS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: T.FILTERS_SUCCESS_LOADED, data: { dealers: data.mark } });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: T.FILTERS_FETCH_ERROR,
        data: { message: 'Ошибка получения данных с сервера' },
      });
    } finally {
      dispatch({ type: T.FILTERS_FETCH_END });
    }
  };
}
