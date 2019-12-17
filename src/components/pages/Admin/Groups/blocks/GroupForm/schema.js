export const defaultSchema = {
  name: {
    presence: { allowEmpty: false, message: '^Название - обязательное поле!' },
    length: {
      maximum: 64,
    },
  },
};
