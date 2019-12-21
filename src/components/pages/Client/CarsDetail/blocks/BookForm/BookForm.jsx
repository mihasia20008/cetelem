import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import validate from 'validate.js';

import Button, { SIZE_TYPES } from '../../../../../base/Button';
import PageLoading from '../../../../../../routes/PageLoading';

import LockIcon from '../../../../../icons/LockIcon';

import { CLIENT_NAME_KEY } from '../../../../../../constants';

import { schema } from './schema';

import styles from './BookForm.module.scss';

function BookForm(props) {
  const { bookInfo, carName, carImage, modification, onSubmitForm } = props;
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      phone: '',
      name: localStorage.getItem(CLIENT_NAME_KEY) || '',
    },
    touched: {},
    errors: {},
    active: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(oldFormState => ({
      ...oldFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    const { name, value } = event.target;

    setFormState(oldFormState => ({
      ...oldFormState,
      values: {
        ...oldFormState.values,
        [name]: name === 'phone' ? value.replace(/\D/, '') : value,
      },
      touched: {
        ...oldFormState.touched,
        [name]: true,
      },
    }));
  };

  const handleFocus = event => {
    event.persist();

    setFormState(oldFormState => ({
      ...oldFormState,
      active: {
        ...oldFormState.active,
        [event.target.name]: true,
      },
    }));
  };

  const handleBlur = event => {
    event.persist();

    setFormState(oldFormState => ({
      ...oldFormState,
      active: {
        ...oldFormState.active,
        [event.target.name]: false,
      },
    }));
  };

  const hasError = field =>
    Boolean(formState.touched[field] && !formState.active[field] && formState.errors[field]);

  const handleSubmitForm = event => {
    event.preventDefault();
    if (!formState.isValid) {
      return;
    }
    onSubmitForm(formState.values);
  };

  const renderCarInfo = () => {
    return (
      <div className={styles.carInfo}>
        <div className={styles.imageWrap}>
          <img className={styles.image} src={carImage} alt={carName} />
        </div>
        <div className={styles.contentWrap}>
          <h3 className={styles.carName}>{carName}</h3>
          <p className={styles.carDescription}>{modification}</p>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className={styles.formContent}>
        <form className={styles.form} onSubmit={handleSubmitForm}>
          <div className={styles.inputWrap}>
            {!formState.values.name && <span className={styles.inputPlaceholder}>Фамилия и имя</span>}
            <input
              autoComplete="off"
              className={styles.input}
              name="name"
              type="text"
              value={formState.values.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className={styles.inputWrap}>
            {!formState.values.phone && <span className={styles.inputPlaceholder}>Телефон</span>}
            <input
              autoComplete="off"
              className={styles.input}
              name="phone"
              type="text"
              value={formState.values.phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <Button
            className={styles.bookButton}
            type="submit"
            size={SIZE_TYPES.BIG}
            text="Забронировать"
            onClick={() => {}}
          />
        </form>
        {/* eslint-disable-next-line no-nested-ternary */}
        {hasError('phone') || hasError('name') ? (
          <div className={styles.inputError}>Ошибка заполнения формы</div>
        ) : bookInfo.error ? (
          <div className={styles.inputError}>Error {JSON.stringify(bookInfo.error)}</div>
        ) : (
          <div className={styles.emptyError} />
        )}
      </div>
    );
  };

  if (bookInfo.success) {
    return (
      <div className={cls(styles.BookForm, styles.successForm)}>
        <div className={styles.iconWrap}>
          <LockIcon />
        </div>
        <p className={styles.bookSuccess}>
          Спасибо, автомобиль забронирован!
          <br />
          Менеджер дилера позвонит вам
          <br />и согласует все детали.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.BookForm}>
      <h2 className={styles.title}>Бронирование автомобиля</h2>
      <p className={styles.subtitle}>Укажите ваши контактные данные</p>
      <div className={styles.wrapper}>
        {renderCarInfo()}
        {renderForm()}
      </div>
      <p className={styles.acceptRules}>
        Указывая свои данные в настоящей электронной анкете я соглашаюсь на обработку моих
        персональных данных в соответствии с федеральным законом российской Федерации от 27 июля
        2006 г. № 152-ФЗ
      </p>
      {bookInfo.loading && (
        <div className={styles.loader}>
          <PageLoading />
        </div>
      )}
    </div>
  );
}

export default BookForm;
