import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import styles from './Button.module.scss';

function Button(props) {
  const { className, text, onClick } = props;

  return (
    <button
      type="button"
      className={cls(styles.Button, className)}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: undefined,
};

export default Button;
