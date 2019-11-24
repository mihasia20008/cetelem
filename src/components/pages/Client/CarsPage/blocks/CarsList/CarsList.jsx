import React, { PureComponent } from 'react';

import CarItem from './blocks/CarItem';

import styles from './CarsList.module.scss';

class CarsList extends PureComponent {
  render() {
    return (
      <div className={styles.CarsList}>
        {Array.from(Array(6).keys()).map(index => {
          return (
            <div key={index} className={styles.item}>
              <CarItem
                link={`/cars/${index}`}
                image="/images/Auto.jpg"
                name="Land Rover Range Rover"
                description="3.0d AT (235 л.с.) 4 WD Inscription"
                price="4 699 000 ₽"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default CarsList;
