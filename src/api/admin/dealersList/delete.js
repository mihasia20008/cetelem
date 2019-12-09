import axios from 'axios';

async function deleteDealer(id) {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `/api/v1/admin/dealers/${id}`,
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

export default deleteDealer;
