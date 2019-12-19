import * as T from './types';

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  data: [],
};

export default function statisticsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.STATISTICS_FETCH_START: {
      return {
        ...state,
        initial: false,
        loading: true,
      };
    }
    case T.STATISTICS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.STATISTICS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.STATISTICS_CLEAR_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case T.STATISTICS_LIST_LOADED: {
      return {
        ...state,
        success: true,
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
}
