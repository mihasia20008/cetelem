import React, { PureComponent } from 'react';

import Dropdown from '../../../../../organisms/Dropdown';

import styles from './TopFilter.module.scss';

class TopFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: 1
    };
  }

  handleOptionSelect = (id) => this.setState({ active: id });

  render() {
    const { active } = this.state;

    return (
      <div className={styles.TopFilter}>
        <Dropdown
          className={styles.filterItem}
          selected={active}
          options={[
            {
              id: 1,
              name: 'Все города',
            },
            {
              id: 2,
              name: 'Город Очень длинное название 2',
            },
            {
              id: 3,
              name: 'Город 3',
            },
            {
              id: 4,
              name: 'Город 4',
            },
            {
              id: 5,
              name: 'Город 5',
            },
            {
              id: 6,
              name: 'Город 6',
            },
            {
              id: 7,
              name: 'Город 7',
            },
            {
              id: 8,
              name: 'Город 8',
            },
          ]}
          onSelect={this.handleOptionSelect}
        />
        <Dropdown
          className={styles.filterItem}
          selected={1}
          options={[
            {
              id: 1,
              name: 'Все салоны',
            },
            {
              id: 2,
              name: 'Салон Очень длинное название 2',
            },
            {
              id: 3,
              name: 'Салон 3',
            },
            {
              id: 4,
              name: 'Салон 4',
            },
          ]}
          onSelect={this.handleOptionSelect}
        />
        <Dropdown
          className={styles.filterItem}
          selected={3}
          options={[
            {
              id: 1,
              name: 'Цена по убыванию',
            },
            {
              id: 2,
              name: 'Цена по возрастанию',
            },
            {
              id: 3,
              name: 'По дате',
            },
            {
              id: 4,
              name: 'По названию',
            },
          ]}
          onSelect={this.handleOptionSelect}
        />
      </div>
    );
  }
}

export default TopFilter;
