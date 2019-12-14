import 'react-input-range/lib/css/index.css';

import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import InputRange from 'react-input-range';

import formatNumber from '../../../../../../../../utilities/formatNumber';

import styles from './Range.module.scss';

const { classNames } = InputRange.defaultProps;

function Range(props) {
  const { name, current, min, max, onChange } = props;

  const handleChange = updatedValue => onChange(name, updatedValue);

  const isSingleRange = current.values === undefined;
  const range = isSingleRange
    ? current.value
    : {
        min: current.values[0],
        max: current.values[1],
      };

  const getFormattedValue = (value) => {
    if (name === 'price') {
      return `${formatNumber(value)} ₽`;
    }
    if (name === 'year') {
      return value;
    }
    return formatNumber(value);
  };

  return (
    <>
      <div className={cls(styles.wrap, isSingleRange && styles.singleWrap)}>
        <InputRange
          classNames={{
            inputRange: cls(
              classNames.inputRange,
              styles.Range,
              isSingleRange ? styles.singleRange : styles.doubleRange
            ),
            disabledInputRange: cls(classNames.disabledInputRange),
            slider: cls(classNames.slider, styles.slider),
            sliderContainer: cls(classNames.sliderContainer, styles.sliderContainer),
            track: cls(classNames.track, styles.track),
            activeTrack: cls(classNames.activeTrack, styles.activeTrack),
            labelContainer: cls(classNames.labelContainer),
            maxLabel: cls(classNames.maxLabel, styles.label),
            minLabel: cls(classNames.minLabel, styles.label),
            valueLabel: cls(classNames.valueLabel, styles.valueLabel),
          }}
          maxValue={max}
          minValue={min}
          value={range}
          onChange={handleChange}
        />
      </div>
      {isSingleRange ? (
        <div className={styles.value}>
          {getFormattedValue(current.value)}
        </div>
      ) : (
        <div className={styles.values}>
          <div className={styles.minValue}>
            {getFormattedValue(current.values[0])}
          </div>
          <div className={styles.maxValue}>
            {getFormattedValue(current.values[1])}
          </div>
        </div>
      )}
    </>
  );
}

Range.propTypes = {
  name: PropTypes.string.isRequired,
  current: PropTypes.shape({
    value: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Range;
