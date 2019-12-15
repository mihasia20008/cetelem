import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import cls from 'classnames';

import Container from '../../base/Container';
import MenuIcon from '../../icons/MenuIcon';
import LocationSelector from '../LocationSelector';
import Modal from "../Modal";

import { withLayoutContext } from '../../../utilities/layoutContext';

import PersonalInfo from './blocks/PersonalInfo';

import styles from './Header.module.scss';

class Header extends PureComponent {
  static propTypes = {
    filled: PropTypes.bool.isRequired,
    fixed: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      openPersonalModal: false,
    };
  }

  handleOpenPersonalModal = () => this.setState({ openPersonalModal: true });

  handleClosePersonalModal = () => this.setState({ openPersonalModal: false });

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
        {/* <NavLink to="/dealers" className={styles.link} activeClassName={styles.activeLink}> */}
        {/*  Поиск дилера */}
        {/* </NavLink> */}
        {/* <NavLink to="/about" className={styles.link} activeClassName={styles.activeLink}> */}
        {/*  О сетелем */}
        {/* </NavLink> */}
      </>
    );
  }

  renderInfo() {
    const { layout } = this.props;

    if (layout.isMobile) {
      return null;
    }

    return (
      <>
        <LocationSelector showIcon />
        <a className={styles.phone} href="tel: 88005005502">
          8 (800) 500-55-02
        </a>
        <button type="button" className={styles.personal} onClick={this.handleOpenPersonalModal}>
          Ваш кредит
        </button>
      </>
    );
  }

  renderMenuToggler() {
    const { layout } = this.props;

    if (!layout.isMobile) {
      return null;
    }

    return (
      <button type="button" className={styles.menuButton}>
        <MenuIcon />
      </button>
    );
  }

  render() {
    const { filled, fixed } = this.props;
    const { openPersonalModal } = this.state;

    return (
      <div className={cls(styles.header, filled && styles.filledHeader, fixed && styles.fixedHeader)}>
        <Container>
          <div className={styles.content}>
            <Link to="/" className={styles.logo}>
              <img src="/images/logo.svg" alt="Сетелем" />
            </Link>
            {this.renderNavigation()}
            <div className={styles.spacer} />
            {this.renderMenuToggler()}
            {this.renderInfo()}
          </div>
        </Container>
        <Modal id="personal-modal" open={openPersonalModal} onClose={this.handleClosePersonalModal}>
          <PersonalInfo />
        </Modal>
      </div>
    );
  }
}

export default withLayoutContext(Header);
