import axios from 'axios';

async function getCitiesList() {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/api/v1/filters/dealers/regions',
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

export default getCitiesList;
