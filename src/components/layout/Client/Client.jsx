import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from '../../organisms/Header';

class ClientLayout extends PureComponent {
  static propTypes = {
    isIndexPage: PropTypes.bool.isRequired,
  };

  render() {
    const { children, isIndexPage } = this.props;

    return (
      <>
        <Header filled={isIndexPage} />
        {children}
      </>
    );
  }
}

export default ClientLayout;
