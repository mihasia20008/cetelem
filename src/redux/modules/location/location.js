import * as T from './types';

const initialState = {
  current: {},
  list: [],
};

export default function locationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.SET_CURRENT_LOCATION: {
      return {
        ...state,
        current: action.data,
      };
    }
    case T.SET_SELECTED_LOCATION: {
      return {
        ...state,
        current: action.variant,
      };
    }
    case T.UPDATE_VARIANTS_LIST: {
      return {
        ...state,
        list: action.data,
      };
    }
    case T.CLEAR_VARIANTS_LIST: {
      return {
        ...state,
        list: [],
      };
    }
    default: {
      return state;
    }
  }
}
