import axios from 'axios';

async function uploadFile(id, formData) {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `/api/v1/dealers/${id}/upload_xml`,
      data: formData,
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
