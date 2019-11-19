import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';

import AdminLayout from '../layout/Admin';
import ClientLayout from '../layout/Client';

import theme from './theme';

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

  get isIndexPage() {
    const { location } = this.props;
    return location.pathname === '/';
  }

  render() {
    const { children } = this.props;

    if (this.isAdminPages) {
      return (
        <ThemeProvider theme={theme}>
          <AdminLayout>{children}</AdminLayout>
        </ThemeProvider>
      );
    }

    return <ClientLayout isIndexPage={this.isIndexPage}>{children}</ClientLayout>;
  }
}

export default withRouter(App);
