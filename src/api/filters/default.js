import axios from 'axios';
import _get from 'lodash/get';

async function getDefaultList() {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/api/v1/filters/default',
    });

    return {
      data: _get(data, '0.data', {}),
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

export default getDefaultList;
