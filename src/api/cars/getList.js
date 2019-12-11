import axios from 'axios';
import qs from 'qs';
import _pick from 'lodash/pick';

import { FILTER_TYPES, FILTER_NAMES } from '../../constants';

const page = 'x-page';
const pagesCount = 'x-pages-number';
const perPage = 'x-per-page';
const total = 'x-total';

const availableParams = ['page', 'per_page'];
const filtersParams = Object.values(FILTER_NAMES);

function prepareCars(list) {
  return list.map(item => {
    return {
      id: item.id,
      name: `${item.mark} ${item.model}`,
      description: item.modification,
      price: item.price,
      image: '/images/Auto.jpg',
    };
  });
}

export async function carListRequest(params, filters) {
  try {
    const filtersQuery = _pick(params, filtersParams);
    const preparedFilters = Object.keys(filtersQuery).reduce((acc, key) => {
      const filter = filters[key];
      if (!filter) {
        return acc;
      }

      switch (filter.type) {
        case FILTER_TYPES.CHECKBOX: {
          acc[key] = filtersQuery[key];
          break;
        }
        case FILTER_TYPES.SELECT: {
          if (key.search('_id') !== -1) {
            if (filtersQuery[key] > 0) {
              acc[key] = filtersQuery[key];
            }
          } else {
            const option = filter.options.find(
              item => item.id.toString() === filtersQuery[key].toString()
            );
            if (option) {
              acc[key] = option.name;
            }
          }
          break;
        }
        case FILTER_TYPES.RANGE: {
          // eslint-disable-next-line prefer-destructuring
          acc[`${key}[min]`] = filtersQuery[key][0];
          // eslint-disable-next-line prefer-destructuring
          acc[`${key}[max]`] = filtersQuery[key][1];
          break;
        }
        default: {
          break;
        }
      }
      return acc;
    }, {});

    const baseQuery = _pick(params, availableParams);
    const { headers, data } = await axios({
      method: 'GET',
      url: `/api/v1/dealer_cars?${qs.stringify({ ...baseQuery, ...preparedFilters })}`,
    });

    return {
      data: {
        list: prepareCars(data),
        meta: {
          page: +headers[page],
          total: +headers[total],
          perPage: +headers[perPage],
          pagesCount: +headers[pagesCount],
        },
      },
      error: null,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return {
      data: null,
      error: {
        status: err.response.status,
        message: err.message,
      },
    };
  }
}
