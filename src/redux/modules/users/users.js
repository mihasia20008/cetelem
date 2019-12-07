import * as T from './types';

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  data: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.USER_RESET_STATUS: {
      return { ...initialState };
    }
    case T.USER_FETCH_START: {
      return {
        ...initialState,
        data: state.data,
        initial: false,
        loading: true,
      };
    }
    case T.USER_FETCH_ERROR: {
      return {
        ...state,
        error: true,
        data: action.data,
      };
    }
    case T.USER_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.USER_LOGIN_SUCCESS: {
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
