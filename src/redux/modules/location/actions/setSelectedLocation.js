import { SET_SELECTED_LOCATION } from '../types';

import { CLIENT_LOCATION_KEY } from "../../../../constants";

export default function setSelected(variant) {
  localStorage.setItem(CLIENT_LOCATION_KEY, variant.id);

  return { type: SET_SELECTED_LOCATION, variant };
}
