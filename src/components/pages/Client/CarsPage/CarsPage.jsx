import React, { PureComponent } from 'react';

import Container from '../../../base/Container';

import CarsList from './blocks/CarsList';
import TopFilter from './blocks/TopFilter';
import SideFilter from './blocks/SideFilter';
import Pagination from './blocks/Pagination';

import styles from './CarsPage.module.scss';

class CarsPage extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.sideFilter}>
              <SideFilter />
            </div>
            <div className={styles.content}>
              <div className={styles.head}>
                <h1 className={styles.title}>Подбор автомобиля</h1>
                <TopFilter />
              </div>
              <CarsList />
              <Pagination />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default CarsPage;
