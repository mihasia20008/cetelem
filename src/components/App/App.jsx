import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AdminLayout from '../layout/Admin';
import ClientLayout from '../layout/Client';

class App extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  };

  static defaultProps = {
    location: {},
  };

  get isAdminPages() {
    const { location } = this.props;
    return location.pathname.search('/admin') === 0;
  }

  render() {
    const { children } = this.props;

    if (this.isAdminPages) {
      return (
        <AdminLayout>
          {children}
        </AdminLayout>
      )
    }

    return (
      <ClientLayout>
        {children}
      </ClientLayout>
    );
  }
}

export default withRouter(App);
