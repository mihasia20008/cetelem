import * as T from './types';

import { FILTER_NAMES, FILTER_TYPES } from '../../../constants';

const initialState = {
  dealer: {
    initial: true,
    loading: false,
    error: false,
    success: false,
  },
  base: {
    initial: true,
    loading: false,
    error: false,
    success: false,
  },
  car: {
    initial: true,
    loading: false,
    error: false,
    success: false,
  },
  data: {
    [`${FILTER_NAMES.MARK}`]: {
      type: FILTER_TYPES.SELECT,
      active: -1,
      text: 'Марка',
      options: [],
    },
    [`${FILTER_NAMES.MODEL}`]: {
      type: FILTER_TYPES.SELECT,
      active: -1,
      text: 'Модель',
      options: [],
    },
    [`${FILTER_NAMES.MODIFICATION}`]: {
      type: FILTER_TYPES.SELECT,
      active: -1,
      text: 'Модификация',
      options: [],
    },
    [`${FILTER_NAMES.COMPLECTATION}`]: {
      type: FILTER_TYPES.SELECT,
      active: -1,
      text: 'Комплектация',
      options: [],
    },
    [`${FILTER_NAMES.AVAILABLE}`]: {
      type: FILTER_TYPES.SELECT,
      active: -1,
      text: 'Наличие у дилера',
      options: [
        {
          id: 0,
          name: 'Все',
        },
        {
          id: 1,
          name: 'В наличии',
        },
        {
          id: 2,
          name: 'Под заказ',
        },
      ],
    },
    [`${FILTER_NAMES.SORT}`]: {
      type: FILTER_TYPES.SELECT,
      active: 0,
      options: [
        {
          id: 0,
          sort: 'date',
          order: 'asc',
          name: 'По дате',
        },
        {
          id: 1,
          sort: 'price',
          order: 'asc',
          name: 'По убыванию цены',
        },
        {
          id: 2,
          sort: 'price',
          order: 'desc',
          name: 'По возрастанию цены',
        },
        {
          id: 3,
          sort: 'name',
          order: 'asc',
          name: 'По названию',
        },
      ],
    },
  },
};

export default function filtersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case T.FILTERS_DEALER_FETCH_START: {
      return {
        ...state,
        dealer: {
          ...state.dealer,
          initial: false,
          loading: true,
        },
      };
    }
    case T.FILTERS_DEALER_FETCH_END: {
      return {
        ...state,
        dealer: {
          ...state.dealer,
          loading: false,
        },
      };
    }
    case T.FILTERS_DEALER_FETCH_ERROR: {
      return {
        ...state,
        dealer: {
          ...state.dealer,
          error: action.data,
        },
      };
    }
    case T.FILTERS_DEALER_SUCCESS_LOADED: {
      return {
        ...state,
        dealer: {
          ...state.dealer,
          success: true,
        },
        data: {
          ...state.data,
          ...action.data,
        },
      };
    }
    case T.FILTERS_BASE_FETCH_START: {
      return {
        ...state,
        base: {
          ...state.base,
          initial: false,
          loading: true,
        },
      };
    }
    case T.FILTERS_BASE_FETCH_END: {
      return {
        ...state,
        base: {
          ...state.base,
          loading: false,
        },
      };
    }
    case T.FILTERS_BASE_FETCH_ERROR: {
      return {
        ...state,
        base: {
          ...state.base,
          error: action.data,
        },
      };
    }
    case T.FILTERS_BASE_SUCCESS_LOADED: {
      return {
        ...state,
        base: {
          ...state.base,
          success: true,
        },
        data: {
          ...state.data,
          ...action.data,
        },
      };
    }
    case T.FILTERS_CAR_FETCH_START: {
      return {
        ...state,
        car: {
          ...state.car,
          initial: false,
          loading: true,
        },
      };
    }
    case T.FILTERS_CAR_FETCH_END: {
      return {
        ...state,
        car: {
          ...state.car,
          loading: false,
        },
      };
    }
    case T.FILTERS_CAR_FETCH_ERROR: {
      return {
        ...state,
        car: {
          ...state.car,
          error: action.data,
        },
      };
    }
    case T.FILTERS_CAR_SUCCESS_LOADED: {
      const updatedData = {};

      if (action.key === FILTER_NAMES.MARK) {
        updatedData[FILTER_NAMES.MARK] = {
          ...state.data[FILTER_NAMES.MARK],
          active: action.active || -1,
          options: action.data,
        };

        updatedData[FILTER_NAMES.MODEL] = {
          ...state.data[FILTER_NAMES.MODEL],
          options: [],
          active: -1,
        };
      }

      if (action.key === FILTER_NAMES.MODEL) {
        updatedData[FILTER_NAMES.MODEL] = {
          ...state.data[FILTER_NAMES.MODEL],
          active: action.active || -1,
          options: action.data,
        };

        updatedData[FILTER_NAMES.MODIFICATION] = {
          ...state.data[FILTER_NAMES.MODIFICATION],
          options: [],
          active: -1,
        };

        updatedData[FILTER_NAMES.COMPLECTATION] = {
          ...state.data[FILTER_NAMES.COMPLECTATION],
          options: [],
          active: -1,
        };
      }

      if (action.key === FILTER_NAMES.MODIFICATION) {
        updatedData[FILTER_NAMES.MODIFICATION] = {
          ...state.data[FILTER_NAMES.MODIFICATION],
          options: action.data,
        };
      }

      if (action.key === FILTER_NAMES.COMPLECTATION) {
        updatedData[FILTER_NAMES.COMPLECTATION] = {
          ...state.data[FILTER_NAMES.COMPLECTATION],
          options: action.data,
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          ...updatedData,
        },
      };
    }
    case T.FILTERS_CAR_ALL_LOADED: {
      return {
        ...state,
        car: {
          ...state.car,
          success: true,
        },
      };
    }
    case T.SET_INITIAL_FILTERS: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.filters,
        },
      };
    }
    case T.FILTERS_CHANGE: {
      const filter = state.data[action.name];
      let updatedFilter = {};
      const effectedFilters = {};

      switch (true) {
        case filter.type === FILTER_TYPES.RANGE: {
          if (filter.values === undefined) {
            updatedFilter = {
              ...filter,
              value: action.value,
            };
          } else {
            updatedFilter = {
              ...filter,
              values: [action.value.min, action.value.max],
            };
          }
          break;
        }
        case [FILTER_TYPES.SELECT, FILTER_TYPES.CHECKBOX].includes(filter.type): {
          updatedFilter = {
            ...filter,
            active: action.value,
          };
          if (action.name === FILTER_NAMES.MARK) {
            effectedFilters[FILTER_NAMES.MODEL] = {
              ...state.data[FILTER_NAMES.MODEL],
              options: [],
              active: -1,
            };
          }
          if (action.name === FILTER_NAMES.MARK || action.name === FILTER_NAMES.MODEL) {
            effectedFilters[FILTER_NAMES.MODIFICATION] = {
              ...state.data[FILTER_NAMES.MODIFICATION],
              options: [],
              active: -1,
            };
            effectedFilters[FILTER_NAMES.COMPLECTATION] = {
              ...state.data[FILTER_NAMES.COMPLECTATION],
              options: [],
              active: -1,
            };
          }
          break;
        }
        default: {
          break;
        }
      }
      return {
        ...state,
        data: {
          ...state.data,
          ...effectedFilters,
          [`${action.name}`]: updatedFilter,
        },
      };
    }
    default: {
      return state;
    }
  }
}
