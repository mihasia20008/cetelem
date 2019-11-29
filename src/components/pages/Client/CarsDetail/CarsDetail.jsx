import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import cls from 'classnames';

import Container from '../../../base/Container';
import Button from '../../../base/Button';
import Modal from '../../../organisms/Modal';

import PinIcon from '../../../icons/PinIcon';
import RatingIcon from '../../../icons/RatingIcon';

import BookForm from './blocks/BookForm';

import styles from './CarsDetail.module.scss';

class CarsDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openBookModal: false,
    };
  }

  handleOpenBookForm = () => this.setState({ openBookModal: true });

  handleCloseBookForm = () => this.setState({ openBookModal: false });

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

  renderMainFeatures = () => {
    return (
      <div className={styles.mainFeatures}>
        <div className={styles.featureItem}>
          <div className={styles.featureName}>
            Комплектация
          </div>
          <div className={styles.featureValue}>
            HSE Luxury
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureName}>
            Расход
          </div>
          <div className={styles.featureValue}>
            5.3 л
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureName}>
            Комплектация
          </div>
          <div className={styles.featureValue}>
            HSE Luxury
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureName}>
            Цвет
          </div>
          <div className={styles.featureValue}>
            Белый
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureName}>
            Разгон
          </div>
          <div className={styles.featureValue}>
            10.3 с
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureName}>
            Цвет
          </div>
          <div className={styles.featureValue}>
            Белый
          </div>
        </div>
      </div>
    );
  };

  renderAdditionalFeatures = () => {
    return (
      <div className={styles.additionalFeatures}>
        <div className={styles.additionalFeaturesColumn}>
          <div className={styles.additionalFeatureItem}>
            Антиблокировочная система (ABS)
          </div>
          <div className={styles.additionalFeatureItem}>
            Антипробуксовочная система
          </div>
          <div className={styles.additionalFeatureItem}>
            Бортовой компьютер
          </div>
          <div className={styles.additionalFeatureItem}>
            Датчик дождя
          </div>
          <div className={styles.additionalFeatureItem}>
            Датчик света
          </div>
          <div className={styles.additionalFeatureItem}>
            Иммобилайзер
          </div>
          <div className={styles.additionalFeatureItem}>
            Количество мест (5)
          </div>
          <div className={styles.additionalFeatureItem}>
            Кондиционер (климат 2-зонный)
          </div>
          <div className={styles.additionalFeatureItem}>
            Круиз-контроль
          </div>
        </div>
        <div className={styles.additionalFeaturesColumn}>
          <div className={styles.additionalFeatureItem}>
            Легкосплавные диски, 17
          </div>
          <div className={styles.additionalFeatureItem}>
            Магнитола (CD)
          </div>
          <div className={styles.additionalFeatureItem}>
            Обогрев зеркал
          </div>
          <div className={styles.additionalFeatureItem}>
            Обогрев сидений
          </div>
          <div className={styles.additionalFeatureItem}>
            Парктроник
          </div>
          <div className={styles.additionalFeatureItem}>
            Подушки безопасности (фронтальные + боковые)
          </div>
          <div className={styles.additionalFeatureItem}>
            Регулировка руля (в 2 пл.)
          </div>
          <div className={styles.additionalFeatureItem}>
            Регулировка сиденья водителя: по высоте
          </div>
          <div className={styles.additionalFeatureItem}>
            Ручная регулировка сиденья пассажира
          </div>
        </div>
      </div>
    )
  };

  renderPriceSidebar = () => {
    return (
      <div className={styles.priceSidebar}>
        <h3 className={styles.pricesTitle}>Цена для вас</h3>
        <div className={styles.totalPrice}>
          <span className={cls(styles.basePrice, styles.priceWithSale)}>5 984 000 ₽</span>
          <span className={cls(styles.basePrice, styles.priceSale)}>6 424 010 ₽</span>
        </div>
        <div className={styles.salesBlock}>
          <div className={styles.saleItem}>
            <span className={styles.saleName}>Скидка дилера</span>
            <span className={styles.saleValue}>70 000 ₽</span>
          </div>
          <div className={styles.saleItem}>
            <span className={styles.saleName}>Спецпредложение</span>
            <span className={styles.saleValue}>47 300 ₽</span>
          </div>
          <div className={styles.saleItem}>
            <span className={styles.saleName}>Бонусы</span>
            <span className={styles.saleValue}>5 000 ₽</span>
          </div>
          <div className={styles.saleItem}>
            <span className={styles.saleName}>Специально для вас</span>
            <span className={styles.saleValue}>10 000 ₽</span>
          </div>
        </div>
        <div className={styles.paymentsList}>
          <div className={styles.paymentItem}>
            <div className={styles.paymentName}>
              Ежемесячный платеж
            </div>
            <div className={styles.paymentValue}>
              84 000 ₽ / месяц
            </div>
          </div>
          <div className={styles.paymentItem}>
            <div className={styles.paymentName}>
              Общая сумма займа
            </div>
            <div className={styles.paymentValue}>
              3 000 000 ₽
            </div>
          </div>
          <div className={styles.paymentItem}>
            <div className={styles.paymentName}>
              Дофинансирование
            </div>
            <div className={styles.paymentValue}>
              1 500 000 ₽
            </div>
          </div>
        </div>
        <Button text="Бронировать" onClick={this.handleOpenBookForm} />
      </div>
    );
  };

  renderMap = () => {
    return (
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
    );
  };

  render() {
    const { openBookModal } = this.state;

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
              {this.renderMainFeatures()}
              {this.renderAdditionalFeatures()}
              {this.renderPriceSidebar()}
            </div>
            {this.renderMap()}
          </div>
        </Container>
        <Modal id="book-modal" open={openBookModal} onClose={this.handleCloseBookForm}>
          <BookForm />
        </Modal>
      </div>
    );
  }
}

export default CarsDetail;
