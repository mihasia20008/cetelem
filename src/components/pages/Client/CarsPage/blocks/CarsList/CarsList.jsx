import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import speakingurl from 'speakingurl';

import CarItem from './blocks/CarItem';

import formatNumber from '../../../../../../utilities/formatNumber';

import styles from './CarsList.module.scss';

class CarsList extends PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
      })
    ),
  };

  static defaultProps = {
    list: [],
  };

  createDetailLink = (id, name) => {
    const slug = speakingurl(`${name} ${id}`, { separator: '-' }).toLowerCase();
    return `/cars/${slug}`;
  };

  render() {
    const { list } = this.props;

    return (
      <div className={styles.CarsList}>
        {list.map(item => {
          return (
            <div key={item.id} className={styles.item}>
              <CarItem
                link={this.createDetailLink(item.id, item.name)}
                image={item.image}
                name={item.name}
                description={item.description}
                price={`${formatNumber(item.price)} ₽`}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default CarsList;
