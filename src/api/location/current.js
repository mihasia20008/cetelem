import axios from 'axios';

async function getCurrent(location) {
  try {
    const url = location
      ? `/api/v1/current_location?location=${location}`
      : '/api/v1/current_location';

    const { data } = await axios({
      method: 'GET',
      url,
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

export default getCurrent;
