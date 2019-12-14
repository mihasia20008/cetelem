import React, { PureComponent } from 'react';
import qs from 'qs';
import { connect } from 'react-redux';

import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

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
      // eslint-disable-next-line react/no-unused-state
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
      },
      title: 'Подбор автомобиля',
    };
  }

  componentDidMount() {
    const {
      location: { query },
      dispatch,
    } = this.props;

    const { mark_id: markId, model_id: modelId } = query;

    Promise.allSettled([
      dispatch(filtersActions.getDealers()),
      dispatch(filtersActions.getBase()),
      dispatch(
        filtersActions.getCarFilter({
          markId,
          loadMarks: true,
          modelId,
          loadModels: Boolean(modelId),
        })
      ),
    ]).then(() => {
      dispatch(loadCarsList(query));
    });
  }

  componentDidUpdate(prevProps) {
    const {
      location: { query: prevQuery },
      filters: prevFilters,
    } = prevProps;
    const {
      location: { query },
      filters: currentFilters,
      dispatch,
    } = this.props;

    if (currentFilters.base.success && !prevFilters.base.success) {
      dispatch(
        filtersActions.setInitialFilters({ type: 'base', filters: currentFilters.data, query })
      );
    }
    if (currentFilters.dealer.success && !prevFilters.dealer.success) {
      dispatch(
        filtersActions.setInitialFilters({ type: 'dealer', filters: currentFilters.data, query })
      );
    }
    if (currentFilters.car.success && !prevFilters.car.success) {
      dispatch(
        filtersActions.setInitialFilters({ type: 'car', filters: currentFilters.data, query })
      );
    }

    if (!_isEqual(query, prevQuery)) {
      dispatch(loadCarsList(query));
    }
  }

  getFiltersByNames = (filters, names) => {
    return names.reduce((acc, name) => {
      return { ...acc, [`${name}`]: filters[name] };
    }, {});
  };

  getActualTitle = () => {
    const {
      filters: { data: filters, car, base },
    } = this.props;

    let title;

    if (base.success) {
      if (filters[FILTER_NAMES.NEW].active) {
        title = 'Новые автомобили';
      } else {
        title = 'Подержанные автомобили';
      }
    }

    if (car.success) {
      const { active, options } = filters[FILTER_NAMES.MARK];
      if (active > 0) {
        const carName = (options.find(item => item.id === active) || {}).name;
        if (carName) {
          title = `${title || 'Автомобили'} ${carName}`;
        }
      }
    }

    return title || 'Подбор автомобиля';
  };

  handleFilterChange = (name, value) => {
    const {
      filters: { data: filters },
      dispatch,
    } = this.props;
    dispatch(filtersActions.changeFilter(name, value));

    if (name === FILTER_NAMES.MARK) {
      dispatch(filtersActions.getCarFilter({ markId: value, loadMarks: false, loadModels: true }));
    }

    if (name === FILTER_NAMES.MODEL) {
      const { active, options } = filters[FILTER_NAMES.MARK];
      const markId = options[active].id;
      dispatch(
        filtersActions.getCarFilter({ markId, modelId: value, loadMarks: false, loadModels: false })
      );
    }

    if (FILTERS_SORT.HEAD.includes(name)) {
      this.handleApplySingleFilter(name, value);
    }
  };

  handleApplySingleFilter = (name, value) => {
    const {
      location,
      history,
      filters: { data: filters },
    } = this.props;

    let query;
    if (name === FILTER_NAMES.SORT) {
      const option = filters[name].options.find(item => item.id === value);
      const cleanQuery = _omit(location.query, ['sort', 'order']);
      query = { ...cleanQuery, sort: option.sort, order: option.order };
    } else {
      const cleanQuery = _omit(location.query, name);
      query = { ...cleanQuery, [`${name}`]: value };
    }

    history.push(`${location.pathname}?${qs.stringify(query)}`);
  };

  handleFilterApply = () => {
    const {
      location,
      history,
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
          if (active > 0) {
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

    const cleanQuery = _omit(location.query, Object.values(FILTER_NAMES));
    const query = { ...cleanQuery, ...params };

    history.push(`${location.pathname}?${qs.stringify(query)}`);
    this.setState({
      title: this.getActualTitle(),
    });
  };

  handleGoToPage = page => {
    const { history, location } = this.props;

    const query = { ...location.query, page };
    history.push(`${location.pathname}?${qs.stringify(query)}`);
  };

  renderSideFilter() {
    const { filters } = this.props;

    if (!filters.base.success) {
      return <div className={styles.sideFilter} />;
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
    const { filters } = this.props;

    if (!filters.dealer.success) {
      return <div className={styles.topFilters} />;
    }

    const topFilters = this.getFiltersByNames(filters.data, FILTERS_SORT.HEAD);

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
    const { title } = this.state;

    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.wrapper}>
            {this.renderSideFilter()}
            <div className={styles.content}>
              <div className={styles.head}>
                <h1 className={styles.title}>{title}</h1>
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
