import _pick from 'lodash/pick';
import _get from 'lodash/get';

import { FILTER_NAMES, BASE_FILTERS, FILTER_TYPES, CLIENT_REGION_KEY, FLOAT_RANGE } from '../../../../constants';

import { SET_INITIAL_FILTERS } from '../types';

export default function setInitialFilters({ type, filters, query = {} }) {
  return (dispatch, getState) => {
    const updatedFilters = {};

    if (type === 'dealer') {
      const dealerId = query[FILTER_NAMES.DEALER_ID];
      if (dealerId) {
        updatedFilters[FILTER_NAMES.DEALER_ID] = {
          ...filters[FILTER_NAMES.DEALER_ID],
          active: parseInt(query[FILTER_NAMES.DEALER_ID], 10),
        };
      }
    }

    if (type === 'cities') {
      const regionId = query[FILTER_NAMES.CITY];
      const initialRegion = query.region;
      const regionFromStorage = localStorage.getItem(CLIENT_REGION_KEY);

      if (initialRegion) {
        const region = filters[FILTER_NAMES.CITY].options.find(
          option => option.id.toString().search(initialRegion) === 0
        );
        if (region) {
          updatedFilters[FILTER_NAMES.CITY] = {
            ...filters[FILTER_NAMES.CITY],
            active: region.id,
          };
        }
      }

      if (!initialRegion && regionId) {
        updatedFilters[FILTER_NAMES.CITY] = {
          ...filters[FILTER_NAMES.CITY],
          active: regionId,
        };
      }

      if (!initialRegion && !regionId && regionFromStorage) {
        const isRegionInFilter = filters[FILTER_NAMES.CITY].options.some(
          option => option.id === regionFromStorage
        );
        if (isRegionInFilter) {
          updatedFilters[FILTER_NAMES.CITY] = {
            ...filters[FILTER_NAMES.CITY],
            active: regionFromStorage,
          };
        }
      }
    }

    if (type === 'car') {
      const defaultFilters = _get(getState(), 'filters.default.data');

      if (defaultFilters[FILTER_NAMES.MARK]) {
        const defaultMark = defaultFilters[FILTER_NAMES.MARK];
        const active = Boolean(
          filters[FILTER_NAMES.MARK].options.findIndex(item => item.id.toString() === defaultMark)
        );
        updatedFilters[FILTER_NAMES.MARK] = {
          ...filters[FILTER_NAMES.MARK],
          active: active ? parseInt(defaultMark, 10) : -1,
        };
      }
      if (defaultFilters[FILTER_NAMES.MODEL]) {
        const defaultModel = defaultFilters[FILTER_NAMES.MODEL];
        const active = Boolean(
          filters[FILTER_NAMES.MODEL].options.findIndex(item => item.id.toString() === defaultModel)
        );
        updatedFilters[FILTER_NAMES.MODEL] = {
          ...filters[FILTER_NAMES.MODEL],
          active: active ? parseInt(defaultModel, 10) : -1,
        };
      }

      const markId = query[FILTER_NAMES.MARK];
      const modelId = query[FILTER_NAMES.MODEL];
      const modificationId = query[FILTER_NAMES.MODIFICATION];
      const complectationId = query[FILTER_NAMES.COMPLECTATION];

      if (markId) {
        const active = Boolean(
          filters[FILTER_NAMES.MARK].options.findIndex(item => item.id.toString() === markId)
        );
        updatedFilters[FILTER_NAMES.MARK] = {
          ...filters[FILTER_NAMES.MARK],
          active: active ? parseInt(markId, 10) : -1,
        };
      }
      if (modelId) {
        const active = Boolean(
          filters[FILTER_NAMES.MODEL].options.findIndex(item => item.id.toString() === modelId)
        );
        updatedFilters[FILTER_NAMES.MODEL] = {
          ...filters[FILTER_NAMES.MODEL],
          active: active ? parseInt(modelId, 10) : -1,
        };
      }
      if (modificationId) {
        const active = Boolean(
          filters[FILTER_NAMES.MODIFICATION].options.findIndex(
            item => item.id.toString() === modificationId
          )
        );
        updatedFilters[FILTER_NAMES.MODIFICATION] = {
          ...filters[FILTER_NAMES.MODIFICATION],
          active: active ? parseInt(modificationId, 10) : -1,
        };
      }
      if (complectationId) {
        const active = Boolean(
          filters[FILTER_NAMES.COMPLECTATION].options.findIndex(
            item => item.id.toString() === complectationId
          )
        );
        updatedFilters[FILTER_NAMES.COMPLECTATION] = {
          ...filters[FILTER_NAMES.COMPLECTATION],
          active: active ? parseInt(complectationId, 10) : -1,
        };
      }
    }

    if (type === 'base') {
      const defaultFilters = _get(getState(), 'filters.default.data');

      if (defaultFilters[FILTER_NAMES.NEW]) {
        updatedFilters[FILTER_NAMES.NEW] = {
          ...filters[FILTER_NAMES.NEW],
          active: defaultFilters[FILTER_NAMES.NEW],
        };
      }

      if (defaultFilters[FILTER_NAMES.PRICE]) {
        const priceFilter = filters[FILTER_NAMES.PRICE];
        const minValue = defaultFilters[FILTER_NAMES.PRICE].min;
        const maxValue = defaultFilters[FILTER_NAMES.PRICE].max;

        const actualMin =
          minValue > priceFilter.min && minValue < priceFilter.max && minValue
            ? minValue
            : priceFilter.values[0];
        const actualMax =
          maxValue > priceFilter.min && minValue < priceFilter.max && actualMin < maxValue
            ? maxValue
            : priceFilter.values[1];

        updatedFilters[FILTER_NAMES.PRICE] = {
          ...priceFilter,
          values: [actualMin, actualMax],
        };
      }

      const baseFiltersFromQuery = _pick(query, BASE_FILTERS);
      Object.keys(baseFiltersFromQuery).forEach(key => {
        const filter = filters[key];
        if (filter) {
          switch (filter.type) {
            case FILTER_TYPES.SELECT: {
              const active = filter.options.findIndex(
                item => item.id.toString() === baseFiltersFromQuery[key]
              );
              updatedFilters[key] = {
                ...filters[key],
                active,
              };
              break;
            }
            case FILTER_TYPES.CHECKBOX: {
              const active = parseInt(baseFiltersFromQuery[key], 10);
              updatedFilters[key] = {
                ...filters[key],
                active: active !== -1 ? active : filters[key].active,
              };
              break;
            }
            case FILTER_TYPES.RANGE: {
              let minValue;
              let maxValue;

              if (FLOAT_RANGE.includes(key)) {
                minValue = parseFloat(baseFiltersFromQuery[key][0]);
                maxValue = parseFloat(baseFiltersFromQuery[key][1]);
              } else {
                minValue = parseInt(baseFiltersFromQuery[key][0], 10);
                maxValue = parseInt(baseFiltersFromQuery[key][1], 10);
              }

              const actualMin =
                minValue > filter.min && minValue < filter.max && minValue
                  ? minValue
                  : filter.values[0];
              const actualMax =
                maxValue > filter.min && minValue < filter.max && actualMin < maxValue
                  ? maxValue
                  : filter.values[1];

              updatedFilters[key] = {
                ...filters[key],
                values: [actualMin, actualMax],
              };

              break;
            }
            default: {
              break;
            }
          }
        }
      });

      if (query.type !== undefined) {
        const active = parseInt(query.type, 10);
        updatedFilters[FILTER_NAMES.NEW] = {
          ...filters[FILTER_NAMES.NEW],
          active: Number.isNaN(active) ? -1 : active,
        };
      }

      if (query.price !== undefined && typeof query.price !== 'object') {
        const value = parseInt(query.price, 10);
        if (!Number.isNaN(value)) {
          const priceFilter = filters[FILTER_NAMES.PRICE];
          const actualMax =
            value > priceFilter.min && value < priceFilter.max && value
              ? value
              : priceFilter.values[1];

          updatedFilters[FILTER_NAMES.PRICE] = {
            ...priceFilter,
            values: [priceFilter.values[0], actualMax],
          };
        }
      }
    }

    if (Object.keys(updatedFilters).length) {
      dispatch({
        type: SET_INITIAL_FILTERS,
        filters: updatedFilters,
      });
    }
  };
}
