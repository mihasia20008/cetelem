import React from 'react';

import PersonalIcon from '../../../../icons/PersonalIcon';
import formatNumber from '../../../../../utilities/formatNumber';

import { CLIENT_NAME_KEY, CLIENT_PARAMS_KEY } from '../../../../../constants';

import styles from './PersonalInfo.module.scss';

function PersonalInfo() {
  const clientName = localStorage.getItem(CLIENT_NAME_KEY) || 'Пользователь';
  const clientParams = JSON.parse(localStorage.getItem(CLIENT_PARAMS_KEY) || '{}');

  const renderLimitInfo = () => {
    if (clientParams.credit_sum) {
      return (
        <p className={styles.text}>
          Вам одобрен лимит <b>{formatNumber(clientParams.credit_sum)} руб.</b> на приобретение
          автомобиля. Воспользуйтесь его частью или всем.
        </p>
      );
    }

    return (
      <p className={styles.text}>
        Вам одобрен лимит на приобретение автомобиля. Воспользуйтесь его частью или всем.
      </p>
    );
  };

  const renderAutoInfo = () => {
    return (
      <>
        <p className={styles.info}>Вам предварительно одобрен кредит на следующих условиях:</p>
        <div className={styles.params}>
          {clientParams.type !== undefined && (
            <div className={styles.paramsItem}>
              <span className={styles.paramsName}>Автомобиль</span>
              <span className={styles.paramsValue}>
                {parseInt(clientParams.type, 10) ? 'Новый' : 'Б/у'}
              </span>
            </div>
          )}
          {clientParams.brand && (
            <div className={styles.paramsItem}>
              <span className={styles.paramsName}>Марка</span>
              <span className={styles.paramsValue}>{clientParams.brand}</span>
            </div>
          )}
          {clientParams.model && (
            <div className={styles.paramsItem}>
              <span className={styles.paramsName}>Модель</span>
              <span className={styles.paramsValue}>{clientParams.model}</span>
            </div>
          )}
          {clientParams.price && (
            <div className={styles.paramsItem}>
              <span className={styles.paramsName}>Сумма</span>
              <span className={styles.paramsValue}>{formatNumber(clientParams.price)} руб.</span>
            </div>
          )}
          {clientParams.downpayment && (
            <div className={styles.paramsItem}>
              <span className={styles.paramsName}>Первоначальный взнос</span>
              <span className={styles.paramsValue}>
                {formatNumber(clientParams.downpayment)} руб.
              </span>
            </div>
          )}
          {clientParams.interestrate && (
            <div className={styles.paramsItem}>
              <span className={styles.paramsName}>Ставка по кредиту</span>
              <span className={styles.paramsValue}>
                {formatNumber(clientParams.interestrate, true)}%.
              </span>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className={styles.PersonalInfo}>
      <div className={styles.iconWrap}>
        <PersonalIcon className={styles.icon} />
      </div>
      <p className={styles.text}>Уважаемый, {clientName}!</p>
      {Boolean(clientParams.brand) && Boolean(clientParams.model)
        ? renderAutoInfo()
        : renderLimitInfo()}
      <p className={styles.mark}>Изменить условия вы можете, обратившись в дилерский центр.</p>
    </div>
  );
}

export default PersonalInfo;
