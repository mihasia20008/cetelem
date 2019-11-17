import React, { PureComponent } from 'react';

import Header from '../../organisms/Header';

class ClientLayout extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}

export default ClientLayout;
