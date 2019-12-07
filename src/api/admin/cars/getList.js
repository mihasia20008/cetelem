import axios from 'axios';

async function getList() {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/api/v1/admin/cars',
    });

    return {
      data,
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
