import _get from 'lodash/get';

import getListWithServerPaginate from '../getListWithServerParinate';

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
    const {
      error,
      data: { list, ...restData },
    } = await getListWithServerPaginate('/api/v1/dealer_cars', params);

    return {
      data: {
        ...restData,
        list: prepareCars(list),
      },
      error,
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
