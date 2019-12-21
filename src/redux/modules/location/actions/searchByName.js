import _get from 'lodash/get';

import { UPDATE_VARIANTS_LIST } from '../types';

import { locationRequests } from '../../../../api';

export default function searchByName(text) {
  return async dispatch => {
    try {

      const { data, error } = await locationRequests.findByName(text);

      if (error) {
        dispatch({ type: UPDATE_VARIANTS_LIST, data: [] });
        return;
      }

      const options = _get(data, 'regions.options', []);
      dispatch({ type: UPDATE_VARIANTS_LIST, data: options });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      dispatch({ type: UPDATE_VARIANTS_LIST, data: [] });
    }
  };
}
