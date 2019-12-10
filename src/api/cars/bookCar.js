import axios from "axios";

export async function bookCarRequest(id, form) {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `/api/v1/dealer_cars/${id}/book`,
      data: form,
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
