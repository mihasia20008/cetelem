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

  return {
    type: SET_INITIAL_FILTERS,
    filters: updatedFilters,
  };
}
