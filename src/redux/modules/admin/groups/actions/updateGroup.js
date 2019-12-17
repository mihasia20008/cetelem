import _omitBy from 'lodash/omitBy';

import {
  GROUPS_FETCH_START,
  GROUPS_FETCH_END,
  GROUPS_FETCH_ERROR,
  GROUPS_ITEM_UPDATED,
} from '../types';

import { adminDealerGroupsRequests } from '../../../../../api';

export default function updateGroup(id, values) {
  return async dispatch => {
    try {
      dispatch({ type: GROUPS_FETCH_START });

      const form = _omitBy(values, value => !value);
      const { error } = await adminDealerGroupsRequests.updateGroup(id, form);

      if (error) {
        dispatch({ type: GROUPS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: GROUPS_ITEM_UPDATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: GROUPS_FETCH_ERROR,
        data: { message: 'Ошибка изменения группы' },
      });
    } finally {
      dispatch({ type: GROUPS_FETCH_END });
    }
  };
}
