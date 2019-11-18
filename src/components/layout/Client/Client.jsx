import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from '../../organisms/Header';
import Footer from '../../organisms/Footer';

import styles from './Client.module.scss';

class ClientLayout extends PureComponent {
  static propTypes = {
    isIndexPage: PropTypes.bool.isRequired,
  };

  render() {
    const { children, isIndexPage } = this.props;

    return (
      <div className={styles.Client}>
        <Header filled={isIndexPage} />
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default ClientLayout;
