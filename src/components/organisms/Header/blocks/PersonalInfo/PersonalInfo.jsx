import React from 'react';

import PersonalIcon from "../../../../icons/PersonalIcon";
import formatNumber from '../../../../../utilities/formatNumber';

import { CLIENT_NAME_KEY, CLIENT_PARAMS_KEY } from "../../../../../constants";

import styles from './PersonalInfo.module.scss';

function PersonalInfo() {
  const clientName = localStorage.getItem(CLIENT_NAME_KEY) || 'Пользователь';
  const clientParams = JSON.parse(localStorage.getItem(CLIENT_PARAMS_KEY) || "{}");

  return (
    <div className={styles.PersonalInfo}>
      <div className={styles.iconWrap}>
        <PersonalIcon className={styles.icon} />
      </div>
      <p className={styles.text}>
        Уважаемый, {clientName}!
      </p>
      <p className={styles.info}>
        Вам предварительно одобрен кредит на следующих условиях:
      </p>
      <div className={styles.params}>
        {clientParams.sum && (
          <div className={styles.paramsItem}>
            <span className={styles.paramsName}>Одобренный кредит</span>
            <span className={styles.paramsValue}>{formatNumber(clientParams.sum)} руб.</span>
          </div>
        )}
        {clientParams.monthlypayment && (
          <div className={styles.paramsItem}>
            <span className={styles.paramsName}>Ежемесячный платеж</span>
            <span className={styles.paramsValue}>{formatNumber(clientParams.monthlypayment)} руб.</span>
          </div>
        )}
        {clientParams.downpayment && (
          <div className={styles.paramsItem}>
            <span className={styles.paramsName}>Первоначальный взнос</span>
            <span className={styles.paramsValue}>{formatNumber(clientParams.downpayment)} руб.</span>
          </div>
        )}
        {clientName !== 'Пользователь' && (
          <div className={styles.paramsItem}>
            <span className={styles.paramsName}>ФИО</span>
            <span className={styles.paramsValue}>{clientName}</span>
          </div>
        )}
      </div>
      <p className={styles.mark}>
        Изменить условия вы можете, обратившись в дилерский центр.
      </p>
    </div>
  );
}

export default PersonalInfo;
