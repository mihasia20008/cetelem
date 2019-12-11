import React, { PureComponent } from 'react';
import qs from 'qs';
import { connect } from 'react-redux';

import _isEqual from 'lodash/isEqual';

import Container from '../../../base/Container';
import PageLoading from '../../../../routes/PageLoading';

import CarsList from './blocks/CarsList';
import TopFilter from './blocks/TopFilter';
import SideFilter from './blocks/SideFilter';
import Pagination from './blocks/Pagination';

import { loadCarsList } from '../../../../redux/modules/cars/actions';
import * as filtersActions from '../../../../redux/modules/filters/actions';

import { FILTER_TYPES, FILTER_NAMES, FILTERS_SORT } from '../../../../constants';

import styles from './CarsPage.module.scss';

class CarsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        [`${FILTER_NAMES.CITY}`]: {
          type: FILTER_TYPES.SELECT,
          active: 0,
          options: [
            {
              id: 0,
              name: 'Все города',
            },
            {
              id: 1,
              name: 'Москва',
            },
            {
              id: 2,
              name: 'Санкт-Петербург',
            },
            {
              id: 3,
              name: 'Казань',
            },
          ],
        },
        [`${FILTER_NAMES.SALON}`]: {
          type: FILTER_TYPES.SELECT,
          active: 0,
          options: [
            {
              id: 0,
              name: 'Все салоны',
            },
            {
              id: 1,
              name: 'Салон 1',
            },
            {
              id: 2,
              name: 'Салон 2',
            },
            {
              id: 3,
              name: 'Салон 3',
            },
          ],
        },
        [`${FILTER_NAMES.SORT}`]: {
          type: FILTER_TYPES.SELECT,
          active: 0,
          options: [
            {
              id: 0,
              name: 'По дате',
            },
            {
              id: 1,
              name: 'По цене',
            },
            {
              id: 2,
              name: 'По названию',
            },
          ],
        },
        [`${FILTER_NAMES.NEW}`]: {
          type: FILTER_TYPES.CHECKBOX,
          active: 0,
          options: [
            {
              id: 0,
              name: 'Новые',
            },
            {
              id: 1,
              name: 'БУ',
            },
          ],
        },
        [`${FILTER_NAMES.PRICE}`]: {
          type: FILTER_TYPES.RANGE,
          text: 'Цена, от-до',
          min: 10000,
          max: 1210000,
          values: [10000, 500000],
        },
        [`${FILTER_NAMES.MARK}`]: {
          type: FILTER_TYPES.SELECT,
          active: -1,
          text: 'Марка',
          options: [
            {
              id: 0,
              name: 'Все марки',
            },
            {
              id: 1,
              name: 'Audi',
            },
            {
              id: 2,
              name: 'BMW',
            },
            {
              id: 3,
              name: 'Mercedes',
            },
            {
              id: 4,
              name: 'Kia',
            },
            {
              id: 5,
              name: 'Ford',
            },
          ],
        },
        [`${FILTER_NAMES.MODEL}`]: {
          type: FILTER_TYPES.SELECT,
          active: -1,
          text: 'Модель',
          options: [
            {
              id: 0,
              name: 'Все модели',
            },
            {
              id: 1,
              name: 'A8',
            },
            {
              id: 2,
              name: 'A7',
            },
            {
              id: 3,
              name: 'S class',
            },
            {
              id: 4,
              name: 'Rio',
            },
            {
              id: 5,
              name: 'Focus',
            },
          ],
        },
        // [`${FILTER_NAMES.GENERATION}`]: {
        //   type: FILTER_TYPES.SELECT,
        //   active: -1,
        //   text: 'Поколение',
        //   options: [],
        // },
        [`${FILTER_NAMES.YEAR}`]: {
          type: FILTER_TYPES.SELECT,
          active: -1,
          text: 'Год',
          options: [],
        },
        // [`${FILTER_NAMES.GEAR}`]: {
        //   type: FILTER_TYPES.SELECT,
        //   active: -1,
        //   text: 'Привод',
        //   options: [],
        // },
        // [`${FILTER_NAMES.BODY}`]: {
        //   type: FILTER_TYPES.SELECT,
        //   active: -1,
        //   text: 'Кузов',
        //   options: [],
        // },
        [`${FILTER_NAMES.COLOR}`]: {
          type: FILTER_TYPES.SELECT,
          active: -1,
          text: 'Цвет',
          options: [],
        },
        // [`${FILTER_NAMES.TRANSMISSION}`]: {
        //   type: FILTER_TYPES.SELECT,
        //   active: -1,
        //   text: 'Коробка',
        //   options: [],
        // },
        // [`${FILTER_NAMES.LIMIT}`]: {
        //   type: FILTER_TYPES.RANGE,
        //   text: 'Размер кредита',
        //   min: 0,
        //   max: 5000000,
        //   value: 1400000,
        // },
      },
    };
  }

  componentDidMount() {
    const {
      location: { query },
      dispatch,
    } = this.props;

    dispatch(loadCarsList(query));
    dispatch(filtersActions.getDealers());
    dispatch(filtersActions.getBase());
  }

  componentDidUpdate(prevProps) {
    const {
      location: { query: prevQuery },
    } = prevProps;
    const {
      location: { query },
      dispatch,
    } = this.props;

    if (!_isEqual(query, prevQuery)) {
      dispatch(loadCarsList(query));
    }
  }

  getFiltersByNames = (filters, names) => {
    return names.reduce((acc, name) => {
      return { ...acc, [`${name}`]: filters[name] };
    }, {});
  };

  handleFilterChange = (name, value) => {
    const { dispatch } = this.props;
    dispatch(filtersActions.changeFilter(name, value));

    // if (FILTERS_SORT.HEAD.includes(name)) {
    //   this.handleFilterApply();
    // }
  };

  handleFilterApply = () => {
    const {
      location,
      dispatch,
      filters: { data: filters },
    } = this.props;

    const params = Object.keys(filters).reduce((acc, key) => {
      switch (filters[key].type) {
        case FILTER_TYPES.CHECKBOX: {
          const { active } = filters[key];
          acc[key] = active;
          break;
        }
        case FILTER_TYPES.SELECT: {
          const { active } = filters[key];
          if (active) {
            acc[key] = active;
          }
          break;
        }
        default: {
          if (filters[key].values === undefined) {
            acc[key] = filters[key].value;
          } else {
            const { values } = filters[key];
            if (
              (values[0] && filters[key].min !== values[0]) ||
              (values[1] && filters[key].max !== values[1])
            ) {
              acc[key] = values;
            }
          }
          break;
        }
      }
      return acc;
    }, {});

    const query = { ...location.query, ...params };
    dispatch(loadCarsList(query));
    window.scrollTo(0, 0);
    // history.push(`${location.pathname}?${qs.stringify(query)}`);
  };

  handleGoToPage = page => {
    const { history, location } = this.props;

    const query = { ...location.query, page };
    history.push(`${location.pathname}?${qs.stringify(query)}`);
  };

  renderSideFilter() {
    const { filters } = this.props;

    if (!filters.base.success) {
      return (
        <div className={styles.sideFilter} />
      );
    }

    const sideFilters = this.getFiltersByNames(filters.data, [
      ...FILTERS_SORT.SIDE.TOP,
      ...FILTERS_SORT.SIDE.BOTTOM,
    ]);

    return (
      <div className={styles.sideFilter}>
        <SideFilter
          sort={FILTERS_SORT.SIDE}
          filters={sideFilters}
          onFilter={this.handleFilterChange}
          onApply={this.handleFilterApply}
        />
      </div>
    );
  }

  renderTopFilters() {
    const { filters } = this.state;
    const topFilters = this.getFiltersByNames(filters, FILTERS_SORT.HEAD);

    return (
      <TopFilter
        className={styles.topFilters}
        sort={FILTERS_SORT.HEAD}
        filters={topFilters}
        onFilter={this.handleFilterChange}
      />
    );
  }

  renderContent() {
    const { initial, loading, success, error, meta, list } = this.props;

    if (initial || loading) {
      return <PageLoading />;
    }

    if (error) {
      return <div>Error {JSON.stringify(error)}</div>;
    }

    return (
      <>
        <CarsList success={success} list={list} />
        {meta.pagesCount > 1 && (
          <Pagination
            current={meta.page}
            total={meta.pagesCount}
            onGoToPage={this.handleGoToPage}
          />
        )}
      </>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.wrapper}>
            {this.renderSideFilter()}
            <div className={styles.content}>
              <div className={styles.head}>
                <h1 className={styles.title}>Подбор автомобиля</h1>
                {this.renderTopFilters()}
              </div>
              {this.renderContent()}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initial: state.cars.initial,
    success: state.cars.success,
    loading: state.cars.loading,
    error: state.cars.error,
    list: state.cars.list,
    meta: state.cars.meta,
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(CarsPage);
