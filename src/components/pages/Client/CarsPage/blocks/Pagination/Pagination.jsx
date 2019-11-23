import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import ArrowRightIcon from '../../../../../icons/ArrowRightIcon';

import styles from './Pagination.module.scss';

function Page({ page, active, onGoToPage }) {
  const handleGoToPage = () => onGoToPage(page);

  return (
    <button
      type="button"
      className={cls(styles.item, styles.page, active && styles.activePage)}
      onClick={handleGoToPage}
    >
      {page}
    </button>
  );
}

class Pagination extends PureComponent {
  static propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onGoToPage: PropTypes.func.isRequired,
  };

  handleGoToNext = () => {
    const { current, onGoToPage } = this.props;
    onGoToPage(current + 1);
  };

  renderPages() {
    const { current, total, onGoToPage } = this.props;

    return (
      <div className={styles.pages}>
        {Array.from(Array(total).keys()).map(page => {
          const index = page + 1;
          return (
            <Page
              key={index}
              page={index}
              active={index === current}
              onGoToPage={onGoToPage}
            />
          )
        })}
      </div>
    );
  }

  renderNextPage() {
    const { current, total } = this.props;

    if (current === total) {
      return null;
    }

    return (
      <button
        type="button"
        className={cls(styles.item, styles.nextPage)}
        onClick={this.handleGoToNext}
      >
        Далее
        <ArrowRightIcon className={styles.nextPageIcon} />
      </button>
    )
  }

  render() {
    return (
      <div className={styles.Pagination}>
        {this.renderPages()}
        {this.renderNextPage()}
      </div>
    );
  }
}

export default Pagination;
