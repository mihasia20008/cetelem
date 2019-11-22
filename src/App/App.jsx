import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';

import Routes from '../routes';

import AdminLayout from '../components/layout/Admin';
import ClientLayout from '../components/layout/Client';

import checkAuthStatus from '../utilities/checkAuthStatus';

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
    if (this.isAdminPages) {
      const authorized = checkAuthStatus();
      return (
        <ThemeProvider theme={theme}>
          <AdminLayout authorized={authorized}>
            <Routes authorized={authorized} />
          </AdminLayout>
        </ThemeProvider>
      );
    }

    return (
      <ClientLayout isIndexPage={this.isIndexPage}>
        <Routes />
      </ClientLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.user.success,
  };
};

export default connect(mapStateToProps)(withRouter(App));
