import _get from 'lodash/get';

import { SET_SELECTED_LOCATION } from '../types';

import { CLIENT_LOCATION_KEY, CLIENT_REGION_KEY } from "../../../../constants";

export default function setSelected(variant) {
  localStorage.setItem(CLIENT_LOCATION_KEY, variant.id);
  localStorage.setItem(CLIENT_REGION_KEY, _get(variant, 'parents.0.id', variant.id));

  return { type: SET_SELECTED_LOCATION, variant };
}
