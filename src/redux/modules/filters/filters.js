import * as T from './types';

const initialState = {
  initial: true,
  loading: false,
  error: false,
  success: false,
  data: {},
};

export default function filtersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.FILTERS_FETCH_START: {
      return {
        ...state,
        initial: false,
        loading: true,
      }
    }
    case T.FILTERS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.FILTERS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.FILTERS_SUCCESS_LOADED: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data,
        },
      };
    }
    default: {
      return state;
    }
  }
}
