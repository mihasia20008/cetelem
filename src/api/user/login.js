import axios from 'axios';

async function loginRequest(auth) {
  try {
    const {
      data: { error, ...data },
    } = await axios({
      method: 'POST',
      url: '/api/login',
      data: auth,
    });
    if (error) {
      if (error === 'invalid user') {
        return {
          data: null,
          error: {
            status: 400,
            message: 'Неверный логин или пароль',
          },
        };
      }
      return {
        data: null,
        error: {
          status: 400,
          message: 'Ошибка авторизации пользователя в системе',
        },
      };
    }
    return {
      data,
      error: null,
    };
  } catch (err) {
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

export default loginRequest;
