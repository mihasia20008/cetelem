import * as T from './types';

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  reload: false,
  data: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.GROUPS_FETCH_START: {
      return {
        ...state,
        initial: false,
        reload: false,
        loading: true,
      };
    }
    case T.GROUPS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.GROUPS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.GROUPS_CLEAR_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case T.GROUPS_LIST_LOADED: {
      return {
        ...state,
        success: true,
        data: action.data,
      };
    }
    case T.GROUPS_ITEM_CREATED:
    case T.GROUPS_ITEM_UPDATED:
    case T.GROUPS_ITEM_DELETED: {
      return {
        ...state,
        reload: true,
      };
    }
    default: {
      return state;
    }
  }
}
