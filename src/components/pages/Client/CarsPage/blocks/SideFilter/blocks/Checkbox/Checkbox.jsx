import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import styles from './Checkbox.module.scss';

function Item(props) {
  const { id, text, checked, onSelect } = props;

  const handleSelect = () => onSelect(id);

  return (
    <button
      type="button"
      className={cls(styles.Item, checked && styles.checkedItem)}
      onClick={handleSelect}
    >
      {text}
    </button>
  );
}

Item.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function Checkbox(props) {
  const { name, active, options, onSelect } = props;

  const handleSelect = id => onSelect(name, id);

  return (
    <div className={styles.Checkbox}>
      {options.map(option => (
        <span key={option.id} className={styles.itemWrap}>
        <Item
          id={option.id}
          text={option.name}
          checked={option.id == active} // eslint-disable-line eqeqeq
          onSelect={handleSelect}
        />
        </span>
      ))}
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  active: -1,
};

export default Checkbox;
