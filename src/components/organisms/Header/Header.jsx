import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import cls from 'classnames';

import Container from '../../base/Container';
import MenuIcon from '../../icons/MenuIcon';
import LocationSelector from '../LocationSelector';

import { withLayoutContext } from '../../../utilities/layoutContext';

import styles from './Header.module.scss';

class Header extends PureComponent {
  static propTypes = {
    filled: PropTypes.bool.isRequired,
  };

  renderNavigation() {
    const { layout } = this.props;

    if (!layout.isDesktop && !layout.isTablet) {
      return null;
    }

    return (
      <>
        <NavLink to="/cars" className={styles.link} activeClassName={styles.activeLink}>
          Подбор автомобиля
        </NavLink>
        <NavLink to="/dealers" className={styles.link} activeClassName={styles.activeLink}>
          Поиск дилера
        </NavLink>
        <NavLink to="/about" className={styles.link} activeClassName={styles.activeLink}>
          О сетелем
        </NavLink>
      </>
    );
  }

  renderInfo() {
    const { layout } = this.props;

    if (!layout.isDesktop) {
      return null;
    }

    return (
      <>
        <LocationSelector showIcon />
        <a className={styles.phone} href="tel: 88005005503">
          8 800 500 55 03
        </a>
        <Link className={styles.personal} to="/personal">
          Личный кабинет
        </Link>
      </>
    );
  }

  renderMenuToggler() {
    const { layout } = this.props;

    if (!layout.isMobile && !layout.isTablet) {
      return null;
    }

    return (
      <button type="button" className={styles.menuButton}>
        <MenuIcon />
      </button>
    );
  }

  render() {
    const { filled } = this.props;

    return (
      <div className={cls(styles.header, filled && styles.filledHeader)}>
        <Container>
          <div className={styles.content}>
            <Link to="/">
              <img src="/images/logo.svg" alt="Сетелем" />
            </Link>
            {this.renderNavigation()}
            <div className={styles.spacer} />
            {this.renderMenuToggler()}
            {this.renderInfo()}
          </div>
        </Container>
      </div>
    );
  }
}

export default withLayoutContext(Header);
