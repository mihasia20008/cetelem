export const defaultSchema = {
  mark: {
    presence: { allowEmpty: false, message: '^Марка - обязательное поле!' },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  model: {
    presence: { allowEmpty: false, message: '^Модель - обязательное поле!' },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  modification: {
    presence: { allowEmpty: false, message: '^Модификация - обязательное поле!' },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  body_type: {
    presence: { allowEmpty: false, message: '^Тип кузова - обязательное поле!' },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  complectation: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  yearStart: {
    presence: { allowEmpty: false, message: '^Год начала выпуска - обязательное поле!' },
    length: {
      maximum: 4,
      tooLong: '^Неверный формат'
    },
  },
  yearEnd: {
    presence: { allowEmpty: true },
    length: {
      maximum: 4,
      tooLong: '^Неверный формат'
    },
  },
};
