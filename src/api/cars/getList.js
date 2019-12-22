import axios from 'axios';
import qs from 'qs';
import _get from 'lodash/get';

const page = 'x-page';
const pagesCount = 'x-pages-number';
const perPage = 'x-per-page';
const total = 'x-total';

function prepareCars(list) {
  return list.map(item => {
    return {
      id: item.id,
      name: `${item.mark} ${item.model}`,
      description: item.modification,
      price: item.price,
      image: _get(item, 'images.0', '/images/Auto.jpg'),
    };
  });
}

export async function carListRequest(params) {
  try {
    const { headers, data } = await axios({
      method: 'GET',
      url: `/api/v1/dealer_cars?${qs.stringify(params)}`,
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
