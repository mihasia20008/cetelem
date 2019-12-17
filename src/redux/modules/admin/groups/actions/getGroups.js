import { adminDealerGroupsRequests } from '../../../../../api';

import {
  GROUPS_FETCH_START,
  GROUPS_FETCH_END,
  GROUPS_FETCH_ERROR,
  GROUPS_LIST_LOADED,
} from '../types';

export default function getGroups() {
  return async dispatch => {
    try {
      dispatch({ type: GROUPS_FETCH_START });

      const { error, data } = await adminDealerGroupsRequests.getList();

      if (error) {
        dispatch({ type: GROUPS_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: GROUPS_LIST_LOADED, data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: GROUPS_FETCH_ERROR,
        data: { message: 'Ошибка получения списка групп' },
      });
    } finally {
      dispatch({ type: GROUPS_FETCH_END });
    }
  };
}
