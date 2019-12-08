import React, { useEffect, useState } from 'react';
import validate from 'validate.js';

import Button, { SIZE_TYPES } from '../../../../../base/Button';

import PhoneIcon from '../../../../../icons/PhoneIcon';
import LockIcon from '../../../../../icons/LockIcon';

import { schema } from './schema';

import styles from './BookForm.module.scss';

function getErrorText(text) {
  if (text.search('поле') !== -1) {
    return 'Текстовое поле обязательно для заполенения!';
  }
  return 'Номер телефона должен содержать 11 символов!';
}

function BookForm() {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
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
        [name]: value.replace(/\D/, ''),
      },
      touched: {
        ...oldFormState.touched,
        [name]: true,
      },
    }));
  };

  const handleFocus = (event) => {
    event.persist();

    setFormState(oldFormState => ({
      ...oldFormState,
      active: {
        ...oldFormState.active,
        [event.target.name]: true,
      },
    }));
  };

  const handleBlur = (event) => {
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

  const renderCarInfo = () => {
    return (
      <div className={styles.carInfo}>
        <div className={styles.imageWrap}>
          <img
            className={styles.image}
            src="/images/book-auto.jpg"
            alt="Land Rover Range Rover IV Рест."
          />
        </div>
        <div className={styles.contentWrap}>
          <h3 className={styles.carName}>Land Rover Range Rover IV Рест.</h3>
          <p className={styles.carDescription}>5.0 AT (525 л.с.) 4WD Autobiography</p>
        </div>
        <LockIcon className={styles.presentationIcon} />
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className={styles.formContent}>
        <p className={styles.bookInfo}>
          Вы хотите забронировать{' '}
          <span className={styles.bookImportant}>Land Rover Discovery V</span>
          <br/>
          у дилера{' '}
          <span className={styles.bookImportant}>Major Land Rover</span>
        </p>
        <p className={styles.bookText}>
          Мы отправим вам СМС для подтверждения бронирования.
          <br />
          Выбор машины не обязывает вас к покупке.
        </p>
        <div className={styles.form}>
          <div className={styles.inputWrap}>
            <PhoneIcon className={styles.inputIcon} />
            {!formState.values.phone && (
              <span className={styles.inputPlaceholder}>8 800 500 55 03</span>
            )}
            <input
              className={styles.input}
              name="phone"
              type="text"
              value={formState.values.phone || ''}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <Button
            className={styles.bookButton}
            inverse
            size={SIZE_TYPES.BIG}
            text="Забронировать"
            onClick={() => {}}
          />
        </div>
        {hasError('phone') ? (
          <div className={styles.inputError}>{getErrorText(formState.errors.phone[0])}</div>
        ) : <div className={styles.emptyError} />}
      </div>
    );
  };

  return (
    <div className={styles.BookForm}>
      {renderCarInfo()}
      {renderForm()}
    </div>
  );
}

export default BookForm;
