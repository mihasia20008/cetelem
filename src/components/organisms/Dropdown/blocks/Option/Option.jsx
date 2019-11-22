import React from 'react';
import PropTypes from 'prop-types';

import CheckIcon from '../../../../icons/CheckIcon';

import styles from './Option.module.scss';

function Option({ id, name, selected, onSelect, onBlur }) {
  const handleSelect = () => onSelect(id);

  return (
    <button type="button" className={styles.Option} onClick={handleSelect} onBlur={onBlur}>
      <span className={styles.name}>{name}</span>
      {selected && <CheckIcon className={styles.icon} />}
    </button>
  );
}

Option.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Option.defaultProps = {
  selected: false,
};

export default Option;
