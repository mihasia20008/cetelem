export const schema = {
  login: {
    presence: { allowEmpty: false, message: '^Логин - обязательное поле!' },
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: '^Пароль - обязательное поле!' },
    length: {
      maximum: 128,
    },
  },
};
