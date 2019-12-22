import axios from 'axios';
import qs from 'qs';

const page = 'x-page';
const pagesCount = 'x-pages-number';
const perPage = 'x-per-page';
const total = 'x-total';

async function getList(params) {
  try {
    const { headers, data } = await axios({
      method: 'GET',
      url: `/api/v1/admin/cars?${qs.stringify(params)}`,
    });

    return {
      data: {
        list: data,
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

export default getList;
