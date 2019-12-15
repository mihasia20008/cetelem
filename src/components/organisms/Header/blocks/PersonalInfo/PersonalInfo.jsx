import React from 'react';

import _capitalize from 'lodash/capitalize';

import PersonalIcon from "../../../../icons/PersonalIcon";

import { CLIENT_NAME_KEY, CLIENT_PARAMS_KEY } from "../../../../../constants";

import formatNumber from '../../../../../utilities/formatNumber';

import styles from './PersonalInfo.module.scss';

function PersonalInfo() {
  const clientName = localStorage.getItem(CLIENT_NAME_KEY) || 'Пользователь';
  const clientParams = JSON.parse(localStorage.getItem(CLIENT_PARAMS_KEY) || {});

  // Вам предварительно одобрен кредит на след условиях: на новый/бу + марка + модель + сумма + взнос + ставка

  const getClientText = (params) => {
    let text = params.type === '1' ? ' новый' : ' подержанный';

    if (params.brand) {
      text = `${text} <b>${_capitalize(params.brand)}</b>`;
      if (params.model) {
        text = `${text} <b>${_capitalize(params.model)}</b>`;
      }
    } else {
      text = `${text} автомобиль`;
    }

    if (params.price) {
      text = `${text} стоимостью <b>${formatNumber(params.price)} ₽</b>`;
    }
    if (params.rate) {
      text = `${text} под ${formatNumber(params.rate, true)}%`;
    }
    if (params.downpayment) {
      text = `${text} с первоначальным взносом <b>${formatNumber(params.downpayment)} ₽</b>`;
    }

    return text;
  };

  return (
    <div className={styles.PersonalInfo}>
      <div className={styles.iconWrap}>
        <PersonalIcon />
      </div>
      <p className={styles.text}>
        Уважаемый, {clientName}!
      </p>
      <p className={styles.info}>
        Вам предварительно одобрен кредит на след условиях:
        <span dangerouslySetInnerHTML={{ __html: getClientText(clientParams) }} />
      </p>
    </div>
  );
}

export default PersonalInfo;
