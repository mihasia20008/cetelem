import * as T from './types';

const initialState = {
  initial: true,
  success: false,
  error: false,
  loading: false,
  reload: false,
  data: [],
};

export default function dealerCarsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.DEALER_CARS_FETCH_START: {
      return {
        ...state,
        initial: false,
        loading: true,
      };
    }
    case T.DEALER_CARS_FETCH_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case T.DEALER_CARS_FETCH_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case T.DEALER_CARS_CLEAR_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case T.DEALER_CARS_LIST_LOADED: {
      return {
        ...state,
        success: true,
        data: action.data,
      };
    }
    case T.DEALER_CARS_ITEM_DELETED: {
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
