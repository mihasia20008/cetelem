// import axios from 'axios';

async function uploadFile(file) {
  try {
    // const { data } = await axios({
    //   method: 'POST',
    //   url: '/api/v1/dealers/upload_xml',
    //   data: { xml: file },
    // });

    console.log(file);
    const res = await new Promise(resolve => setTimeout(() => resolve('est'), 2000));
    console.log(res);
    return {
      data: {},
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
