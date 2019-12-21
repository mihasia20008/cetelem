import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../base/Button';
import Dropdown from '../../../../../organisms/Dropdown';
import Checkbox from './blocks/Checkbox';
import Range from './blocks/Range';

import { FILTER_NAMES, FILTER_TYPES } from '../../../../../../constants';

import styles from './SideFilter.module.scss';

class SideFilter extends PureComponent {
  static propsTypes = {
    filters: PropTypes.shape({
      type: PropTypes.oneOf(['select', 'range', 'checkbox']).isRequired,
      active: PropTypes.number,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          name: PropTypes.string,
        })
      ),
      name: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      values: PropTypes.arrayOf(PropTypes.number),
    }),
    sort: PropTypes.shape({
      TOP: PropTypes.arrayOf(PropTypes.string),
      BOTTOM: PropTypes.arrayOf(PropTypes.string),
    }),
    onFilter: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
  };

  static defaultProps = {
    filters: {},
  };

  handlerChangeFilter = type => (name, value) => {
    const { onFilter } = this.props;
    onFilter(name, value, type);
  };

  renderSelect = (name, filter) => {
    return (
      <div key={name} className={styles.selector}>
        <Dropdown
          filled
          name={name}
          initialText={filter.text}
          selected={filter.active}
          options={filter.options}
          onSelect={this.handlerChangeFilter(FILTER_TYPES.SELECT)}
        />
      </div>
    );
  };

  renderCheckbox = (name, filter) => {
    return (
      <Checkbox
        key={name}
        name={name}
        onSelect={this.handlerChangeFilter(FILTER_TYPES.CHECKBOX)}
        active={filter.active}
        options={filter.options}
      />
    );
  };

  renderRange = (name, filter) => {
    const { min, max, text, ...current } = filter;

    return (
      <div key={name} className={styles.range}>
        <div className={styles.rangeText}>{text}</div>
        <Range
          name={name}
          min={min}
          max={max}
          current={current}
          onChange={this.handlerChangeFilter(FILTER_TYPES.RANGE)}
        />
      </div>
    );
  };

  renderFilter(name) {
    const { filters } = this.props;
    const filter = filters[name];

    switch (true) {
      case filter.type === FILTER_TYPES.SELECT: {
        return this.renderSelect(name, filter);
      }
      case filter.type === FILTER_TYPES.CHECKBOX: {
        return this.renderCheckbox(name, filter);
      }
      case filter.type === FILTER_TYPES.RANGE: {
        return this.renderRange(name, filter);
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const { sort, filters, onApply } = this.props;

    const isSelectOld = filters[FILTER_NAMES.NEW].active === 0;
    const bottomFilters = isSelectOld
      ? sort.BOTTOM
      : sort.BOTTOM.filter(
          key => ![FILTER_NAMES.STATE, FILTER_NAMES.RUN, FILTER_NAMES.MODIFICATION].includes(key)
        );

    return (
      <div className={styles.SideFilter}>
        <div className={styles.top}>{sort.TOP.map(name => this.renderFilter(name))}</div>
        <div className={styles.divider} />
        <div className={styles.bottom}>
          {bottomFilters.map(name => this.renderFilter(name))}
          <Button text="Показать" onClick={onApply} />
        </div>
      </div>
    );
  }
}

export default SideFilter;
