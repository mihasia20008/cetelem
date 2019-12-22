import axios from 'axios';

async function createCar(form) {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/v1/admin/cars',
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

export default createCar;
