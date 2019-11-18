import React from 'react';
import ProptTypes from 'prop-types';
import cls from 'classnames';

import styles from './FooterButton.module.scss';

function FooterButton({ to, children, className, ...restProps }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a href={to} className={cls(styles.button, className)} {...restProps}>
      {children}
    </a>
  );
}

FooterButton.propTypes = {
  to: ProptTypes.string.isRequired,
  children: ProptTypes.node.isRequired,
  className: ProptTypes.string,
};

FooterButton.defaultProps = {
  className: undefined,
};

export default FooterButton;
