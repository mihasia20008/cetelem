import axios from 'axios';

import { NOT_AUTHORISED } from '../response';

async function refreshRequest() {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/v1/refresh',
    });

    return {
      data: {
        csrf: data.csrf,
        user: {
          login: 'admin',
          role: 'admin'
        },
      },
      error: null,
    };
  } catch (err) {
    if (err.response.status === NOT_AUTHORISED) {
      return {
        data: null,
        error: {
          status: NOT_AUTHORISED,
          message: 'Ошибка аутентификации',
        },
      };
    }

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

export default refreshRequest;
