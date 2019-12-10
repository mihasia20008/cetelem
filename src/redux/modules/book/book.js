import * as T from './types';

const initialState = {
  initial: true,
  loading: false,
  success: false,
  error: false,
  data: {},
};

export default function bookReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.BOOK_FETCH_START: {
      return {
        ...initialState,
        initial: false,
        loading: true,
      };
    }
    case T.BOOK_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.BOOK_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.BOOK_SUCCESS: {
      return {
        ...state,
        success: true,
        data: action.data,
      };
    }
    case T.BOOK_RESET: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}
