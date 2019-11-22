import React, { PureComponent } from 'react';

import Dropdown from '../../../../../organisms/Dropdown';

import styles from './SideFilter.module.scss';

class SideFilter extends PureComponent {
  render() {
    return (
      <div className={styles.SideFilter}>
        <Dropdown
          filled
          selected={2}
          initialName="Модель"
          options={[
            {
              id: 1,
              name: 'Модель 1'
            },
            {
              id: 2,
              name: 'Модель 2'
            },
            {
              id: 3,
              name: 'Модель 3'
            },
            {
              id: 4,
              name: 'Модель 4'
            },
          ]}
          onSelect={() => {}}
        />
      </div>
    );
  }
}

export default SideFilter;
