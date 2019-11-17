import React, { PureComponent } from 'react';

import logo from './logo.svg';
import styles from './Header.module.scss';

class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}>
        <img src={logo} alt="Cetelem" />
      </div>
    );
  }
}

export default Header;
