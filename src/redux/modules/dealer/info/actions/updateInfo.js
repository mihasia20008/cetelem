import _omitBy from 'lodash/omitBy';

import {
  DEALER_INFO_FETCH_START,
  DEALER_INFO_FETCH_END,
  DEALER_INFO_FETCH_ERROR,
  DEALER_INFO_DATA_UPDATED,
} from '../types';

import { dealerInfoRequests } from '../../../../../api';

export default function updateDealer(id, values) {
  return async dispatch => {
    try {
      dispatch({ type: DEALER_INFO_FETCH_START });

      const form = _omitBy(values, value => !value);
      const preparedForm = {
        legal_name: form.legal_name,
        trade_name: form.trade_name,
        official_dealer: Boolean(form.official_dealer),
        used_car_saling: Boolean(form.used_car_saling),
        code: form.code,
        rate: form.rate,
        contact_infos_attributes: [{ "value_type": "phone", "value": form.phone }],
        address_attributes: {
          postcode: form.postcode,
          country: form.country,
          region: form.region,
          city: form.city,
          street: form.street,
          building: form.building,
          location: [form.locationX, form.locationY],
        },
      };
      const { error } = await dealerInfoRequests.updateInfo(id, preparedForm);

      if (error) {
        dispatch({ type: DEALER_INFO_FETCH_ERROR, data: error });
        return;
      }

      dispatch({ type: DEALER_INFO_DATA_UPDATED });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      dispatch({
        type: DEALER_INFO_FETCH_ERROR,
        data: { message: 'Ошибка изменения дилера' },
      });
    } finally {
      dispatch({ type: DEALER_INFO_FETCH_END });
    }
  };
}
