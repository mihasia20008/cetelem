import * as T from './types';

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  data: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.USERS_FETCH_START: {
      return {
        ...state,
        initial: false,
        reload: false,
        loading: true,
      };
    }
    case T.USERS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.USERS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.USERS_CLEAR_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case T.USERS_LIST_LOADED: {
      return {
        ...state,
        success: true,
        data: action.data,
      };
    }
    case T.USERS_ITEM_CREATED:
    case T.USERS_ITEM_UPDATED:
    case T.USERS_ITEM_DELETED: {
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
