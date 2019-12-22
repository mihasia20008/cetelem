import { filtersRequests } from '../../../../api';

import * as T from '../types';

export default function getCities() {
  return async dispatch => {
    try {
      dispatch({ type: T.FILTERS_CITIES_FETCH_START });
      const { error, data } = await filtersRequests.getCitiesList();

      if (error) {
        dispatch({ type: T.FILTERS_CITIES_FETCH_ERROR, data: error });
        return;
      }

      dispatch({
        type: T.FILTERS_CITIES_SUCCESS_LOADED,
        data: { region_id: { ...data.regions, active: 0 } },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: T.FILTERS_CITIES_FETCH_ERROR,
        data: { message: 'Ошибка получения данных с сервера' },
      });
    } finally {
      dispatch({ type: T.FILTERS_CITIES_FETCH_END });
    }
  };
}
