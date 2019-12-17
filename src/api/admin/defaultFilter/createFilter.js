import axios from 'axios';

async function createFilter(form) {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/v1/admin/default_filters',
      data: form
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

export default createFilter;
