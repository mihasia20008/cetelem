import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import Header from '../../organisms/Header';
import Footer from '../../organisms/Footer';

import styles from './Client.module.scss';

class ClientLayout extends PureComponent {
  static propTypes = {
    isIndexPage: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scroll = window.pageYOffset || 0;
    const updatedFixedHeader = scroll > 0;

    const { fixedHeader } = this.state;

    if (fixedHeader !== updatedFixedHeader) {
      this.setState({ fixedHeader: updatedFixedHeader });
    }
  };

  render() {
    const { children, isIndexPage } = this.props;
    const { fixedHeader } = this.state;

    return (
      <div className={styles.Client}>
        <Header filled={isIndexPage} fixed={fixedHeader} />
        <div className={cls(styles.content, fixedHeader && styles.fixedHeader)}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default ClientLayout;
