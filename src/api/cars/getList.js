import axios from "axios";
import qs from 'qs';
import _pick from 'lodash/pick';

const page = 'x-page';
const perPage = 'x-per-page';
const total = 'x-total';

const availableParams = ['page', 'per_page'];

function prepareCars(list) {
  return list.map(item => {
    return {
      id: item.id,
      name: `${item.mark} ${item.model}`,
      description: item.modification,
      price: item.price,
      image: '/images/Auto.jpg'
    }
  })
}

export async function carListRequest(params) {
  try {
    const query = _pick(params, availableParams);

    const { headers, data } = await axios({
      method: 'GET',
      url: `/api/v1/dealer_cars?${qs.stringify(query)}`,
    });

    return {
      data: {
        list: prepareCars(data),
        meta: {
          page: +headers[page],
          total: +headers[total],
          perPage: +headers[perPage],
        }
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
    }
  }
}
