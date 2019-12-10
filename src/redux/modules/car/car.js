import * as T from './types';

const initialState = {
  initial: true,
  loading: false,
  success: false,
  error: false,
  data: {},
};

export default function carsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.CAR_FETCH_START: {
      return {
        ...initialState,
        initial: false,
        loading: true,
      };
    }
    case T.CAR_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.CAR_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.CAR_FETCH_SUCCESS: {
      return {
        ...state,
        data: action.data,
      }
    }
    case T.CAR_INFO_LOADED: {
      return {
        ...state,
        success: true,
      };
    }
    default: {
      return state;
    }
  }
}
