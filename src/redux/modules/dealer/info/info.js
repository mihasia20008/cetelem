import * as T from "./types";

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  reload: false,
  data: {},
};

export default function dealerInfoReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.DEALER_INFO_FETCH_START: {
      return {
        ...state,
        initial: false,
        reload: false,
        loading: true,
      };
    }
    case T.DEALER_INFO_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.DEALER_INFO_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.DEALER_INFO_CLEAR_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case T.DEALER_INFO_DATA_LOADED: {
      return {
        ...state,
        success: true,
        data: action.data,
      };
    }
    case T.DEALER_INFO_DATA_UPDATED: {
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
