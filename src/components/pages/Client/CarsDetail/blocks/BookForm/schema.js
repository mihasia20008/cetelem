export const schema = {
  phone: {
    presence: { allowEmpty: false, message: '- обязательное поле!' },
    length: {
      is: 11,
      tooLong: "needs to have %{count} words or more",
      tooShort: "needs to have %{count} words or more",
    },
  },
};
