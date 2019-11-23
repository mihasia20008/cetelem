import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import Dropdown from '../../../../../organisms/Dropdown';

import styles from './TopFilter.module.scss';

function TopFilter({ className, filters, sort, onFilter }) {
  return (
    <div className={cls(styles.TopFilter, className)}>{
      sort.map(name => {
        const filter = filters[name];

        if (filter.type !== 'select') {
          return null;
        }

        return (
          <Dropdown
            key={name}
            className={styles.filterItem}
            name={name}
            selected={filter.active}
            options={filter.options}
            onSelect={onFilter}
          />
        );
      })
    }</div>
  );
}

TopFilter.propTypes = {
  className: PropTypes.string,
  sort: PropTypes.arrayOf(PropTypes.string),
  onFilter: PropTypes.func.isRequired,
};

TopFilter.defaultProps = {
  className: undefined,
  sort: [],
};

export default TopFilter;
