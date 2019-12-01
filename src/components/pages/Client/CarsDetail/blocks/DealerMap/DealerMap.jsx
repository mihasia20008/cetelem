import React from 'react';
import { Map, Placemark, YMaps } from "react-yandex-maps";

import PinIcon from "../../../../../icons/PinIcon";
import RatingIcon from "../../../../../icons/RatingIcon";

import styles from './DealerMap.module.scss';

function DealerMap() {
  return (
    <div className={styles.DealerMap}>
      <YMaps>
        <Map
          width="100%"
          height="100%"
          defaultState={{
            center: [55.751574, 37.573856],
            zoom: 11,
            behaviors: ['scrollZoom'],
          }}
        >
          <Placemark
            geometry={[55.680775, 37.477516]}
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
          <h3 className={styles.name}>Major Land Rover Новорижский</h3>
          <div className={styles.rating}>
            {Array.from(Array(5).keys()).map(index => (
              <RatingIcon key={index} className={styles.ratingIcon} active={index < 4} />
            ))}
          </div>
          <p className={styles.address}>
            Новорижское шоссе, 9-й, Москва,
            <br />
            Московская обл., 308010
          </p>
          <a href="tel: 88005005503" className={styles.phone}>
            8 800 500 55 03
          </a>
        </div>
      </div>
    </div>
  );
}

export default DealerMap;
