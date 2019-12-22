import * as T from './types';

const initialState = {
  initial: true,
  loading: false,
  success: false,
  error: false,
  list: [],
  meta: {},
};

export default function carsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.CARS_FETCH_START: {
      return {
        ...state,
        initial: false,
        error: false,
        loading: true,
      };
    }
    case T.CARS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.CARS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.CARS_FETCH_SUCCESS: {
      return {
        ...state,
        success: true,
        ...action.data,
      }
    }
    default: {
      return state;
    }
  }
}
