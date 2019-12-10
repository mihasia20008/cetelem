import axios from "axios";

export async function carDetailRequest(id) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/v1/dealer_cars/${id}`,
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
    }
  }
}
