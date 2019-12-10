import axios from 'axios';

async function uploadFile(id, file) {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `/api/v1/dealers/upload_xml?id=${id}`,
      data: { xml: file },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
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

export default uploadFile;
