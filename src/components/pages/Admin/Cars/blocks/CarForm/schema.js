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
  engine_type: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  engine_volume: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  engine_hp: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  body_type: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  doors_count: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  drive: {
    presence: { allowEmpty: true },
    length: {
      maximum: 64,
      tooLong: '^Неверный формат'
    },
  },
  gearbox: {
    presence: { allowEmpty: true },
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
};
