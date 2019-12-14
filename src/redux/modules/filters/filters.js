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
  data: {
    mark_id: {
      type: FILTER_TYPES.SELECT,
      active: -1,
      text: 'Марка',
      options: [
        {
          id: 0,
          name: 'Все марки',
        },
        {
          id: 1,
          name: 'Audi',
        },
        {
          id: 2,
          name: 'BMW',
        },
        {
          id: 97,
          name: 'Nissan',
        },
        {
          id: 3,
          name: 'Mercedes',
        },
        {
          id: 4,
          name: 'Kia',
        },
        {
          id: 5,
          name: 'Ford',
        },
      ],
    },
    model_id: {
      type: FILTER_TYPES.SELECT,
      active: -1,
      text: 'Модель',
      options: [
        {
          id: 0,
          name: 'Все модели',
        },
        {
          id: 2196,
          name: 'Juke, I Рестайлинг',
        },
        {
          id: 2003,
          name: 'Qashqai+2, I Рестайлинг',
        },
      ],
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
          [`${action.name}`]: updatedFilter,
        },
      };
    }
    default: {
      return state;
    }
  }
}
