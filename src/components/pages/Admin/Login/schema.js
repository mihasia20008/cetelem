export const schema = {
  login: {
    presence: { allowEmpty: false, message: '- обязательное поле!' },
    // email: {
    //   message: '- неверное значение!',
    // },
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: '- обязательное поле!' },
    length: {
      maximum: 128,
    },
  },
};
