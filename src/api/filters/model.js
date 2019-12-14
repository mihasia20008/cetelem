import axios from 'axios';

async function getModelsList(markId) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/v1/filters/marks/${markId}/models`,
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

export default getModelsList;
