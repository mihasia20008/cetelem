import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import _get from 'lodash/get';

import { ThemeProvider } from '@material-ui/styles';

import Routes from '../routes';
import PageLoading from '../routes/PageLoading';
import AdminLayout from '../components/layout/Admin';
import ClientLayout from '../components/layout/Client';

import checkAuthStatus from '../utilities/checkAuthStatus';

import { tryAccess, skipLogin, resetLoginStatus } from '../redux/modules/user/actions';

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

    if (this.isAdminPages && authorized) {
      dispatch(tryAccess());
    } else {
      dispatch(skipLogin());
    }
  }

  get isAdminPages() {
    const { location } = this.props;
    return location.pathname.search('/admin') === 0;
  }

  get isLoginPage() {
    const { location } = this.props;
    return location.pathname.search('/admin/login') === 0;
  }

  get isIndexPage() {
    const { location } = this.props;
    return location.pathname === '/';
  }

  get isAuthorized() {
    const { userStatuses } = this.props;
    return checkAuthStatus() && !userStatuses.error;
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(resetLoginStatus());
  };

  renderAdminContent = () => {
    const { userStatuses, userType } = this.props;

    if ((userStatuses.loading && !this.isLoginPage) || userStatuses.initial) {
      return <PageLoading />;
    }

    return <Routes authorized={this.isAuthorized} userType={userType} />;
  };

  renderAdminLayout() {
    const { location, userName } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <AdminLayout
          authorized={this.isAuthorized}
          pathname={location.pathname}
          userName={userName}
          onLogout={this.handleLogout}
        >
          {this.renderAdminContent()}
        </AdminLayout>
      </ThemeProvider>
    );
  }

  render() {
    if (this.isAdminPages) {
      return this.renderAdminLayout();
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
    userStatuses: {
      initial: state.user.initial,
      success: state.user.success,
      loading: state.user.loading,
      error: state.user.error,
    },
    userType: _get(state, 'user.data.role', null),
    userName: _get(state, 'user.data.login', ''),
  };
};

export default connect(mapStateToProps)(withRouter(App));
