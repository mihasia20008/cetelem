import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import _get from 'lodash/get';

import { ThemeProvider } from '@material-ui/styles';

import Routes from '../routes';
import AdminLayout from '../components/layout/Admin';
import ClientLayout from '../components/layout/Client';

import checkAuthStatus from '../utilities/checkAuthStatus';

import { tryRefresh, resetLoginStatus } from "../redux/modules/user/actions";

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

  componentDidMount() {
    const { dispatch } = this.props;
    const authorized = checkAuthStatus();

    if (authorized) {
      dispatch(tryRefresh());
    }
  }

  get isAdminPages() {
    const { location } = this.props;
    return location.pathname.search('/admin') === 0;
  }

  get isIndexPage() {
    const { location } = this.props;
    return location.pathname === '/';
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(resetLoginStatus());
  };

  render() {
    if (this.isAdminPages) {
      const { location, userType, userName } = this.props;
      const authorized = checkAuthStatus();
      return (
        <ThemeProvider theme={theme}>
          <AdminLayout
            authorized={authorized}
            pathname={location.pathname}
            userName={userName}
            onLogout={this.handleLogout}
          >
            <Routes authorized={authorized} userType={userType} />
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
    error: state.user.error,
    userType: _get(state, 'user.data.role', null),
    userName: _get(state, 'user.data.login', ''),
  };
};

export default connect(mapStateToProps)(withRouter(App));
