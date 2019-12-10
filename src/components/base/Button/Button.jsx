import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import styles from './Button.module.scss';

export const SIZE_TYPES = {
  DEFAULT: 'defaultSize',
  BIG: 'bigSize',
};

function Button(props) {
  const { className, size, inverse, text, type, onClick } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={cls(
        styles.Button,
        size && styles[size],
        inverse && styles.inverseButton,
        className,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  inverse: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(SIZE_TYPES)),
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: undefined,
  type: 'button',
  size: SIZE_TYPES.DEFAULT,
  inverse: false,
};

export default Button;
