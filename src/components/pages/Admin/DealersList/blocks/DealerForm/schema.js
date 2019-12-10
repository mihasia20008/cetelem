export const dealerSchema = {
  trade_name: {
    presence: { allowEmpty: false, message: '^Название - обязательное поле!' },
    length: {
      maximum: 64,
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
  code: {
    presence: { allowEmpty: true },
    length: {
      maximum: 10,
      wrongLength: '^Введено недопустимое количество символов'
    },
  },
  postcode: {
    presence: { allowEmpty: true },
    length: {
      maximum: 10,
      wrongLength: '^Введено недопустимое количество символов'
    },
  },
  country: {
    presence: { allowEmpty: true },
  },
  region: {
    presence: { allowEmpty: true },
  },
  city: {
    presence: { allowEmpty: false, message: '^Город - обязательное поле!' },
    length: {
      maximum: 64,
    },
  },
  street: {
    presence: { allowEmpty: false, message: '^Улица - обязательное поле!' },
    length: {
      maximum: 64,
    },
  },
  building: {
    presence: { allowEmpty: false, message: '^Номер дома - обязательное поле!' },
    length: {
      maximum: 10,
      wrongLength: '^Введено недопустимое количество символов'
    },
  },
  locationX: {
    presence: { allowEmpty: false, message: '^Широта - обязательное поле!' },
  },
  locationY: {
    presence: { allowEmpty: false, message: '^Долгота - обязательное поле!' },
  },
};
