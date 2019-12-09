export const defaultSchema = {
  login: {
    presence: { allowEmpty: false, message: '^Логин - обязательное поле!' },
    length: {
      maximum: 64,
    },
  },
  role: {
    presence: { allowEmpty: false, message: '^Роль - обязательное поле!' },
    length: {
      maximum: 20,
    },
  },
};

export const passwordSchema = {
  password: {
    presence: { allowEmpty: false, message: '^Пароль - обязательное поле!' },
    length: {
      maximum: 64,
      minimum: 6,
      tooShort: '^Минимальная длина - 6 символов!'
    },
  },
  confirm: {
    presence: { allowEmpty: false, message: '^Подтверждение пароля - обязательное поле!' },
    equality: {
      attribute: "password",
      message: "^Введенные пароли не совпадают!",
    }
  },
};

export const dealerSchema = {
  dealer_id: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      notGreaterThan: "^Дилер - обязательно для заполнения"
    }
  }
};
