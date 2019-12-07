import axios from 'axios';

import { NOT_AUTHORISED } from '../response';

async function accessRequest() {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/api/v1/current_user',
    });

    return {
      data,
      error: null,
    };
  } catch (err) {
    if (err.response.status === NOT_AUTHORISED) {
      return {
        data: null,
        error: {
          status: NOT_AUTHORISED,
          message: 'Время действия сессии истекло',
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

export default accessRequest;
