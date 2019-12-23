import getListWithServerPaginate from '../../getListWithServerParinate';

async function getList(params) {
  try {
    return await getListWithServerPaginate('/api/v1/admin/cars', params);
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
