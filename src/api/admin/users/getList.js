import axios from 'axios';

import { NOT_AUTHORISED } from '../../response';

async function getList() {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/api/v1/admin/users',
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
          message: 'Неверный логин или пароль',
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

export default getList;
