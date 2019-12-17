import {
  GROUPS_FETCH_START,
  GROUPS_FETCH_END,
  GROUPS_FETCH_ERROR,
  GROUPS_ITEM_CREATED,
} from '../types';

import { adminDealerGroupsRequests } from '../../../../../api';

export default function createGroup(form) {
  return async dispatch => {
    try {
      dispatch({ type: GROUPS_FETCH_START });

      const { error } = await adminDealerGroupsRequests.createGroup(form);

      if (error) {
        dispatch({ type: GROUPS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: GROUPS_ITEM_CREATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: GROUPS_FETCH_ERROR,
        data: { message: 'Ошибка создания группы' },
      });
    } finally {
      dispatch({ type: GROUPS_FETCH_END });
    }
  };
}
