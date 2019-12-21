import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { connect } from 'react-redux';

import _get from 'lodash/get';

import LocationIcon from './blocks/LocationIcon';

import useCloseOnOutsideEvents from '../../../utilities/useCloseOnOutsideEvents';

import * as locationActions from '../../../redux/modules/location/actions';

import styles from './LocationSelector.module.scss';
import SearchIcon from '../../icons/SearchIcon';
import Option from '../Dropdown/blocks/Option';

function LocationSelector(props) {
  const {
    type,
    className,
    initialText,
    showIcon,
    primaryLink,
    position,
    selectedText,
    options,
    dispatch,
  } = props;

  const locationRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [searchText, changeSearch] = useState('');

  useEffect(() => {
    if (type === 'footer') {
      dispatch(locationActions.getCurrentLocation());
    }
  }, [type, dispatch]);

  const handleCloseOverlay = useCallback(() => {
    setOpen(false);
    changeSearch('');
    dispatch(locationActions.clearLastSearch());
  }, [setOpen, dispatch]);

  // нужно в дополнении к handleBlur
  // т к handleBlur не всегда вызывается в safari
  useCloseOnOutsideEvents({
    ref: locationRef,
    callback: useCallback(() => handleCloseOverlay(), [handleCloseOverlay]),
    isOpen: open,
  });

  const handleBlur = useCallback(
    event => {
      event.persist();
      const { current: domNode } = locationRef;
      let { relatedTarget } = event;

      // ie 11 hack
      if (relatedTarget === null) {
        relatedTarget = document.activeElement;
      }

      if (domNode && !domNode.contains(relatedTarget)) {
        // без setTimeout не успевает проходить onClick на <Option />
        setTimeout(() => handleCloseOverlay(), 0);
      }
    },
    [locationRef, handleCloseOverlay]
  );

  const handleOpen = () => setOpen(true);

  const handleSelect = id => {
    const option = options.find(item => item.id === id);
    dispatch(locationActions.setSelectedLocation(option));
    handleCloseOverlay();
  };

  const handleSearch = event => {
    event.persist();
    const { value } = event.target;
    changeSearch(value);
    if (value) {
      dispatch(locationActions.searchByName(value));
    }
  };

  const renderTrigger = () => {
    return (
      <button className={styles.trigger} type="button" onClick={handleOpen} onBlur={handleBlur}>
        {showIcon && <LocationIcon />}
        <span className={cls(styles.city, primaryLink && styles.primaryLink, className)}>
          {selectedText || initialText}
        </span>
      </button>
    );
  };

  const renderSearchField = () => {
    return (
      <div className={styles.searchWrap}>
        <input
          placeholder="Введите название..."
          className={styles.searchInput}
          type="text"
          value={searchText}
          onChange={handleSearch}
        />
        <SearchIcon className={styles.searchIcon} />
      </div>
    );
  };

  const renderOverlay = () => {
    if (!open) {
      return null;
    }

    return (
      <div
        className={cls(
          styles.overlay,
          position === 'left' && styles.leftOverlay,
          position === 'right' && styles.rightOverlay,
          type === 'footer' && styles.footerOverlay,
        )}
      >
        {renderSearchField()}
        <div className={styles.optionsWrap}>
          {options.map(option => (
            <Option
              key={option.id}
              id={option.id}
              name={option.name}
              searchText={searchText}
              // selected={option.id == selected} // eslint-disable-line eqeqeq
              onSelect={handleSelect}
              onBlur={handleBlur}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={locationRef}
      className={cls(styles.LocationSelector, primaryLink && styles.primaryLink)}
    >
      {renderTrigger()}
      {renderOverlay()}
    </div>
  );
}

LocationSelector.propTypes = {
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  primaryLink: PropTypes.bool,
  type: PropTypes.oneOf(['header', 'footer']).isRequired,
  position: PropTypes.oneOf(['left', 'right']),

  initialText: PropTypes.string,
};

LocationSelector.defaultProps = {
  className: undefined,
  showIcon: false,
  primaryLink: false,
  position: 'left',
  initialText: 'Выберите',
};

const mapStateToProps = state => {
  const currentCity = _get(state, 'location.current.city', '');
  const currentRegion = _get(state, 'location.current.region', '');
  const currentName = _get(state, 'location.current.name', '');

  return {
    selectedText: currentName || currentCity || currentRegion,
    options: _get(state, 'location.list', []),
  };
};

export default connect(mapStateToProps)(LocationSelector);
