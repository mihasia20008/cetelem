import * as T from '../types';

import { filtersRequests } from '../../../../api';
import { FILTER_NAMES } from '../../../../constants';

const TYPES = {
  [`${FILTER_NAMES.MARK}`]: 'mark',
  [`${FILTER_NAMES.MODEL}`]: 'model',
  [`${FILTER_NAMES.MODIFICATION}`]: 'modification',
  [`${FILTER_NAMES.COMPLECTATION}`]: 'complectation',
};

export default function getCarFilters({ markId, modelId, loadMarks, loadModels }) {
  return async dispatch => {
    try {
      dispatch({ type: T.FILTERS_CAR_FETCH_START });

      const carsRequests = [];
      const requestsTypes = [];
      if (loadMarks) {
        carsRequests.push(filtersRequests.getMarksList());
        requestsTypes.push(FILTER_NAMES.MARK);
      }
      if (markId && loadModels) {
        carsRequests.push(filtersRequests.getModelsList(markId));
        requestsTypes.push(FILTER_NAMES.MODEL);
      }
      if (markId && modelId) {
        carsRequests.push(filtersRequests.getModificationsList(markId, modelId));
        requestsTypes.push(FILTER_NAMES.MODIFICATION);

        carsRequests.push(filtersRequests.getComplectationsList(markId, modelId));
        requestsTypes.push(FILTER_NAMES.COMPLECTATION);
      }

      const carResponses = await Promise.allSettled(carsRequests);

      carResponses.forEach((response, index) => {
        if (response.value.error) {
          // eslint-disable-next-line no-console
          console.log(response.value.error);
          return;
        }

        const type = requestsTypes[index];
        dispatch({
          type: T.FILTERS_CAR_SUCCESS_LOADED,
          key: type,
          data: response.value.data[TYPES[type]].options,
        });
      });

      dispatch({ type: T.FILTERS_CAR_ALL_LOADED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: T.FILTERS_CAR_FETCH_ERROR,
        data: { message: 'Ошибка получения данных с сервера' },
      });
    } finally {
      dispatch({ type: T.FILTERS_CAR_FETCH_END });
    }
  };
}
