export const schema = {
  name: {
    presence: { allowEmpty: false, message: '^Имя - обязательное поле!' },
    length: {
      maximum: 64,
      wrongLength: "^Превышен лимит длины ввода",
    },
  },
  phone: {
    presence: { allowEmpty: false, message: '^Номер телефона - обязательное поле!' },
    length: {
      is: 11,
      wrongLength: "^Неверный формат номера телефона",
    },
  },
};
