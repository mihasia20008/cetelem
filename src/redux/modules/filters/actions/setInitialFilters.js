import { FILTER_NAMES } from '../../../../constants';

import { SET_INITIAL_FILTERS } from '../types';

export default function setInitialFilters({ type, filters, query = {} }) {
  const updatedFilters = {};

  if (type === 'dealer') {
    const dealerId = query[FILTER_NAMES.DEALER_ID];
    if (!dealerId) {
      return { type: 'do_noting' };
    }

    updatedFilters[FILTER_NAMES.DEALER_ID] = {
      ...filters[FILTER_NAMES.DEALER_ID],
      active: parseInt(query[FILTER_NAMES.DEALER_ID], 10),
    };
  }

  if (type === 'car') {
    const markId = query[FILTER_NAMES.MARK];
    const modelId = query[FILTER_NAMES.MODEL];
    const modificationId = query[FILTER_NAMES.MODIFICATION];
    const complectationId = query[FILTER_NAMES.COMPLECTATION];

    if (markId) {
      const active = Boolean(filters[FILTER_NAMES.MARK].options.findIndex(
        item => item.id.toString() === markId
      ));
      updatedFilters[FILTER_NAMES.MARK] = {
        ...filters[FILTER_NAMES.MARK],
        active: active ? parseInt(markId, 10) : -1,
      };
    }
    if (modelId) {
      const active = Boolean(filters[FILTER_NAMES.MODEL].options.findIndex(
        item => item.id.toString() === modelId
      ));
      updatedFilters[FILTER_NAMES.MODEL] = {
        ...filters[FILTER_NAMES.MODEL],
        active: active ? parseInt(modelId, 10) : -1,
      };
    }
    if (modificationId) {
      const active = Boolean(filters[FILTER_NAMES.MODIFICATION].options.findIndex(
        item => item.id.toString() === modificationId
      ));
      updatedFilters[FILTER_NAMES.MODIFICATION] = {
        ...filters[FILTER_NAMES.MODIFICATION],
        active: active ? parseInt(modificationId, 10) : -1,
      };
    }
    if (complectationId) {
      const active = Boolean(filters[FILTER_NAMES.COMPLECTATION].options.findIndex(
        item => item.id.toString() === complectationId
      ));
      updatedFilters[FILTER_NAMES.COMPLECTATION] = {
        ...filters[FILTER_NAMES.COMPLECTATION],
        active: active ? parseInt(complectationId, 10) : -1,
      };
    }
  }

  return {
    type: SET_INITIAL_FILTERS,
    filters: updatedFilters,
  };
}
