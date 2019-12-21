import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CarItem.module.scss';

function CarItem(props) {
  const { link, image, name, description, price } = props;

  return (
    <div className={styles.CarItem}>
      <div className={styles.imageWrap}>
        <Link className={styles.imageLink} to={link}>
          <img className={styles.image} src={image} alt={name} />
        </Link>
      </div>
      <Link className={styles.link} to={link}>
        <h3 className={styles.name}>{name}</h3>
      </Link>
      <div className={styles.description}>{description}</div>
      <div className={styles.price}>{price}</div>
    </div>
  );
}

export default CarItem;
