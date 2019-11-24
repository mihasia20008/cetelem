// import axios from 'axios';

const fakeAuth = async ({ username, password }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      switch (true) {
        case username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin': {
          resolve({ data: { token: 'admin-fake-token', user: { username: 'admin', role: 0 } } });
          break;
        }
        case username.toLowerCase() === 'dealer' && password.toLowerCase() === 'dealer': {
          resolve({ data: { token: 'dealer-fake-token', user: { username: 'dealer', role: 1 } } });
          break;
        }
        default: {
          resolve({ data: { error: 'invalid user' } });
          break;
        }
      }
    }, 500);
  });
};

async function loginRequest(auth) {
  try {
    // const {
    //   data: { error, ...data },
    // } = await axios({
    //   method: 'POST',
    //   url: '/api/login',
    //   data: auth,
    // });
    const {
      data: { error, ...data },
    } = await fakeAuth(auth);
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

export default loginRequest;
