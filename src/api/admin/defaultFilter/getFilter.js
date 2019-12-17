import axios from 'axios';

async function getFilter(id) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/v1/admin/default_filters/${id}`,
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

export default getFilter;
