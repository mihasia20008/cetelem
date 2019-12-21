import { SET_CURRENT_LOCATION } from '../types';

import { locationRequests } from '../../../../api';

import { CLIENT_LOCATION_KEY } from "../../../../constants";

export default function getCurrentLocation() {
  return async dispatch => {
    try {

      const location = localStorage.getItem(CLIENT_LOCATION_KEY);
      const { data, error } = await locationRequests.getCurrent(location);

      if (error) {
        dispatch({ type: SET_CURRENT_LOCATION, data: {} });
        return;
      }

      dispatch({ type: SET_CURRENT_LOCATION, data });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      dispatch({ type: SET_CURRENT_LOCATION, data: {} });
    }
  };
}
