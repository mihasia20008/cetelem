import * as T from '../types';

import { filtersRequests } from '../../../../api';
import { FILTER_NAMES } from '../../../../constants';

const TYPES = {
  [`${FILTER_NAMES.MARK}`]: 'mark',
  [`${FILTER_NAMES.MODEL}`]: 'model',
  [`${FILTER_NAMES.MODIFICATION}`]: 'modification',
  [`${FILTER_NAMES.COMPLECTATION}`]: 'complectation',
};

async function loadByQuery(dispatch, brand, model = '') {
  try {
    const marksResponse = await filtersRequests.getMarksList();
    if (marksResponse.error) {
      throw new Error(marksResponse.error);
    }

    const markName = brand.toLowerCase();
    const marksOptions = marksResponse.data[TYPES[FILTER_NAMES.MARK]].options || [];
    const activeMark = marksOptions.find(mark => mark.name.toLowerCase() === markName) || {};
    dispatch({
      type: T.FILTERS_CAR_SUCCESS_LOADED,
      key: FILTER_NAMES.MARK,
      data: marksOptions,
      active: activeMark.id,
    });

    if (activeMark.id) {
      const modelsResponse = await filtersRequests.getModelsList(activeMark.id);
      if (modelsResponse.error) {
        throw new Error(modelsResponse.error);
      }

      const modelsOptions = modelsResponse.data[TYPES[FILTER_NAMES.MODEL]].options || [];
      let activeModel = {};
      if (model) {
        const modelName = model.toLowerCase();
        activeModel =
          modelsOptions.find(item => item.name.toLowerCase().search(modelName) !== -1) || {};
      }
      dispatch({
        type: T.FILTERS_CAR_SUCCESS_LOADED,
        key: FILTER_NAMES.MODEL,
        data: modelsOptions,
        active: activeModel.id,
      });

      if (activeModel.id) {
        const modificationsResponse = await filtersRequests.getModificationsList(
          activeMark.id,
          activeModel.id
        );
        if (modificationsResponse.error) {
          throw new Error(modificationsResponse.error);
        }
        const modificationsOptions =
          modificationsResponse.data[TYPES[FILTER_NAMES.MODIFICATION]].options || [];
        dispatch({
          type: T.FILTERS_CAR_SUCCESS_LOADED,
          key: FILTER_NAMES.MODIFICATION,
          data: modificationsOptions,
        });

        const complectationsResponse = await filtersRequests.getComplectationsList(
          activeMark.id,
          activeModel.id
        );
        if (complectationsResponse.error) {
          throw new Error(complectationsResponse.error);
        }
        const complectationsOptions =
          complectationsResponse.data[TYPES[FILTER_NAMES.COMPLECTATION]].options || [];
        dispatch({
          type: T.FILTERS_CAR_SUCCESS_LOADED,
          key: FILTER_NAMES.COMPLECTATION,
          data: complectationsOptions,
        });
      }
    }

    dispatch({ type: T.FILTERS_CAR_ALL_LOADED });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch({
      type: T.FILTERS_CAR_FETCH_ERROR,
      data: { message: 'Ошибка получения данных с сервера' },
    });
  }
}

export default function getCarFilters({ markId, modelId, loadMarks, loadModels, brand, model }) {
  return async dispatch => {
    try {
      dispatch({ type: T.FILTERS_CAR_FETCH_START });

      if (brand) {
        await loadByQuery(dispatch, brand, model);
        return;
      }

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
