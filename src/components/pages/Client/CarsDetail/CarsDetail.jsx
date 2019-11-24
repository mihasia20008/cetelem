import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import Container from '../../../base/Container';

import PinIcon from '../../../icons/PinIcon';
import RatingIcon from '../../../icons/RatingIcon';

import styles from './CarsDetail.module.scss';

class CarsDetail extends PureComponent {
  renderHead = () => {
    return (
      <div className={styles.head}>
        <div className={styles.autoHead}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="/images/dealer_logo.png"
              alt="Land Rover Discovery V"
            />
          </div>
          <div className={styles.contentWrap}>
            <h1 className={styles.title}>Land Rover Discovery V</h1>
            <div className={styles.contentInfo}>
              <span className={styles.stock}>В наличии</span>
              <span className={styles.vin}>VIN: WDC15694*1J****75</span>
            </div>
          </div>
        </div>
        <div className={styles.companyHead}>
          <div className={styles.pinIconWrap}>
            <PinIcon className={styles.pinIcon} />
          </div>
          <div className={styles.dealerContent}>
            <h3 className={styles.dealerName}>Major Land Rover Новорижский</h3>
            <p className={styles.dealerAddress}>
              Новорижское шоссе, 9-й, Москва,
              <br />
              Московская обл., 308010
            </p>
          </div>
        </div>
      </div>
    );
  };

  renderShortInfo = () => {
    return (
      <div className={styles.shortInfo}>
        <div className={styles.shortItem}>
          <span className={styles.shortName}>Год выпуска</span>
          <span className={styles.shortValue}>2018</span>
        </div>
        <div className={styles.shortItem}>
          <span className={styles.shortName}>Кузов</span>
          <span className={styles.shortValue}>SUV</span>
        </div>
        <div className={styles.shortItem}>
          <span className={styles.shortName}>Коробка</span>
          <span className={styles.shortValue}>AT</span>
        </div>
        <div className={styles.shortItem}>
          <span className={styles.shortName}>Топливо</span>
          <span className={styles.shortValue}>DE</span>
        </div>
        <div className={styles.shortItem}>
          <span className={styles.shortName}>Привод</span>
          <span className={styles.shortValue}>4WD</span>
        </div>
        <div className={styles.shortItem}>
          <span className={styles.shortName}>Двигатель</span>
          <span className={styles.shortValue}>3.0 л / 249 л.с.</span>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.top}>
              {this.renderHead()}
              <div className={styles.slider} />
              {this.renderShortInfo()}
            </div>
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>Дополнительные характеристики</h2>
            </div>
            <div className={styles.map}>
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
              <div className={styles.dealerMapInfo}>
                <div className={styles.dealerPinWrap}>
                  <PinIcon />
                </div>
                <div className={styles.dealerMapContent}>
                  <h3 className={styles.dealerMapName}>Major Land Rover Новорижский</h3>
                  <div className={styles.dealerMapRating}>
                    {Array.from(Array(5).keys()).map(index => (
                      <RatingIcon key={index} className={styles.dealerMapRatingIcon} active={index < 4} />
                    ))}
                  </div>
                  <p className={styles.dealerMapAddress}>
                    Новорижское шоссе, 9-й, Москва,
                    <br />
                    Московская обл., 308010
                  </p>
                  <a href="tel: 88005005503" className={styles.dealerMapPhone}>
                    8 800 500 55 03
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default CarsDetail;
