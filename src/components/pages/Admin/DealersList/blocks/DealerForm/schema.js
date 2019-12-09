export const dealerSchema = {
  name: {
    presence: { allowEmpty: false, message: '^Название - обязательное поле!' },
    length: {
      maximum: 64,
    },
  },
  address: {
    presence: { allowEmpty: false, message: '^Адрес - обязательное поле!' },
    length: {
      maximum: 256,
    },
  },
  phone: {
    presence: { allowEmpty: false, message: '^Номер телефона - обязательное поле!' },
    numericality: {
      onlyInteger: true,
      notInteger: '^В поле Номер телефона разрешено вводить только цифры!'
    },
    length: {
      is: 11,
      wrongLength: '^Введен некорректный номер телефона!'
    },
  },
};
