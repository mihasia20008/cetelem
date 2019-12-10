import React from 'react';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

import PinIcon from '../../../../../icons/PinIcon';
import RatingIcon from '../../../../../icons/RatingIcon';

import styles from './DealerMap.module.scss';

function DealerMap(props) {
  const { name, address, rating, location, phone } = props;

  const formatPhone = text => {
    try {
      const cleaned = text.toString().replace(/\D/g, '');
      const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
      return `${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    } catch (e) {
      return '';
    }
  };

  return (
    <div className={styles.DealerMap}>
      <YMaps>
        <Map
          width="100%"
          height="100%"
          defaultState={{
            center: [+location.x, +location.y],
            zoom: 14,
            behaviors: ['scrollZoom'],
          }}
        >
          <Placemark
            geometry={[+location.x, +location.y]}
            options={{
              iconLayout: 'default#image',
              iconImageHref: '/images/map-mark.svg',
              iconImageSize: [40, 50],
              iconImageOffset: [-20, -50],
            }}
          />
        </Map>
      </YMaps>
      <div className={styles.dealerInfo}>
        <div className={styles.pinWrap}>
          <PinIcon />
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.rating}>
            {Array.from(Array(5).keys()).map(index => (
              <RatingIcon key={index} className={styles.ratingIcon} active={index < rating} />
            ))}
          </div>
          <p className={styles.address}>{address}</p>
          {phone && (
            <a href={`tel: ${phone}`} className={styles.phone}>
              {formatPhone(phone)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default DealerMap;
