import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import ArrowDownIcon from '../../icons/ArrowDownIcon';

import Option from './blocks/Option';

import useCloseOnOutsideEvents from '../../../utilities/useCloseOnOutsideEvents';

import styles from './Dropdown.module.scss';

const MAX_OPTIONS_WITHOUT_SEARCH = 15;

function Dropdown(props) {
  const { name, className, filled, selected, initialText, options, disabled, onSelect } = props;
  const optionsCount = options.length;

  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [searchText, changeSearch] = useState('');

  const inactive = disabled || !optionsCount;

  // нужно в дополнении к handleBlur
  // т к handleBlur не всегда вызывается в safari
  useCloseOnOutsideEvents({
    ref: dropdownRef,
    callback: useCallback(() => setOpen(false), [setOpen]),
  });

  const handleBlur = useCallback(
    event => {
      const { current: domNode } = dropdownRef;
      let { relatedTarget } = event;

      // ie 11 hack
      if (relatedTarget === null) {
        relatedTarget = document.activeElement;
      }

      if (domNode && !domNode.contains(relatedTarget)) {
        // без setTimeout не успевает проходить onClick на <Option />
        setTimeout(() => setOpen(false), 0);
      }
    },
    [dropdownRef, setOpen]
  );

  const handleOpen = () => setOpen(!open);

  const handleSelect = id => {
    onSelect(name, id);
    setOpen(false);
  };

  const handleSearch = event => {
    event.persist();
    changeSearch(event.target.value);
  };

  const selectedText = (options.find(option => option.id === selected) || {}).name;
  const text = selectedText || initialText;

  const renderTrigger = () => {
    return (
      <button
        type="button"
        className={styles.trigger}
        disabled={inactive}
        onClick={handleOpen}
        onBlur={handleBlur}
      >
        <span
          className={cls(
            styles.triggerText,
            text === selectedText ? styles.selectedText : styles.initialText
          )}
        >
          {text}
        </span>
        <ArrowDownIcon className={cls(styles.triggerIcon, open && styles.openTriggerIcon)} />
      </button>
    );
  };

  const renderSearchField = () => {
    return (
      <div className={styles.searchWrap}>
        <input
          placeholder="Поиск..."
          className={styles.searchInput}
          type="text"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
    );
  };

  const renderOverlay = () => {
    if (!open) {
      return null;
    }

    const shouldRenderSearch = optionsCount > MAX_OPTIONS_WITHOUT_SEARCH;
    const preparedSearch = searchText.toLowerCase();

    const filteredOptions = searchText.length
      ? options.filter(option => option.name.toLowerCase().search(preparedSearch) !== -1)
      : options;

    return (
      <div className={styles.overlay}>
        {shouldRenderSearch && renderSearchField()}
        {filteredOptions.map(option => (
          <Option
            key={option.id}
            id={option.id}
            name={option.name}
            selected={option.id == selected} // eslint-disable-line eqeqeq
            onSelect={handleSelect}
            onBlur={handleBlur}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={cls(styles.Dropdown, filled && styles.filledDropdown, className)}
    >
      {renderTrigger()}
      {renderOverlay()}
    </div>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  disabled: PropTypes.bool,
  filled: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  className: undefined,
  selected: '',
  initialText: 'Выберите',
  options: [],
  disabled: false,
  filled: false,
};

export default Dropdown;
