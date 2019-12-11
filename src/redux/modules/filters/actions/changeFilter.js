import { FILTERS_CHANGE } from '../types';

export default function changeFilter(name, value) {
  return {
    type: FILTERS_CHANGE,
    name,
    value,
  };
}
