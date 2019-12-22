import React, { PureComponent } from 'react';
import qs from 'qs';
import { connect } from 'react-redux';

import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

import Container from '../../../base/Container';
import Button from '../../../base/Button';
import PageLoading from '../../../../routes/PageLoading';
import FilterIcon from '../../../icons/FilterIcon';
import CloseIcon from '../../../icons/CloseIcon';
import Modal from '../../../organisms/Modal';

import CarsList from './blocks/CarsList';
import TopFilter from './blocks/TopFilter';
import SideFilter from './blocks/SideFilter';
import Pagination from './blocks/Pagination';

import { loadCarsList } from '../../../../redux/modules/cars/actions';
import * as filtersActions from '../../../../redux/modules/filters/actions';

import { FILTER_TYPES, FILTER_NAMES, FILTERS_SORT } from '../../../../constants';
import allSettled from '../../../../utilities/allSettled';
import formatNumber from '../../../../utilities/formatNumber';
import { withLayoutContext } from '../../../../utilities/layoutContext';

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
      modalOpen: false,
    };
  }

  componentDidMount() {
    const {
      location: { query },
      dispatch,
    } = this.props;

    const { mark_id: queryMark, model_id: queryModel, brand, model } = query;

    dispatch(filtersActions.getDefault())
      .then(result => {
        const { mark_id: defaultMark, model_id: defaultModel } = result;
        const markId =
          // eslint-disable-next-line no-nested-ternary
          queryMark !== undefined ? queryMark : defaultMark !== -1 ? defaultMark : undefined;
        const modelId =
          // eslint-disable-next-line no-nested-ternary
          queryMark !== undefined ? queryModel : defaultModel !== -1 ? defaultModel : undefined;

        return allSettled([
          dispatch(filtersActions.getDealers()),
          dispatch(filtersActions.getBase()),
          dispatch(filtersActions.getCitiesFilter()),
          dispatch(
            filtersActions.getCarFilter({
              markId,
              loadMarks: true,
              modelId,
              loadModels: Boolean(markId),
              brand,
              model,
            })
          ),
        ]);
      })
      .then(() => {
        dispatch(loadCarsList(query));
      });
  }

  componentDidUpdate(prevProps) {
    const {
      location: { query: prevQuery },
      filters: prevFilters,
      layout: prevLayout,
      success: prevCarsLoadSuccess,
    } = prevProps;
    const {
      location: { query },
      filters: currentFilters,
      layout: nowLayout,
      success: nowCarsLoadSuccess,
      dispatch,
    } = this.props;
    const { modalOpen } = this.state;

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
    if (currentFilters.cities.success && !prevFilters.cities.success) {
      dispatch(
        filtersActions.setInitialFilters({ type: 'cities', filters: currentFilters.data, query })
      );
    }
    if (currentFilters.car.success && !prevFilters.car.success) {
      dispatch(
        filtersActions.setInitialFilters({ type: 'car', filters: currentFilters.data, query })
      );
    }

    if (
      nowCarsLoadSuccess &&
      currentFilters.car.success &&
      currentFilters.dealer.success &&
      currentFilters.base.success &&
      currentFilters.cities.success &&
      (!prevCarsLoadSuccess ||
        !prevFilters.car.success ||
        !prevFilters.dealer.success ||
        !prevFilters.base.success ||
        !prevFilters.cities.success)
    ) {
      this.handleFilterApply();
    }

    if (prevLayout.isMobile && !nowLayout.isMobile && modalOpen) {
      this.handleCloseModal();
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
      switch (filters[FILTER_NAMES.NEW].active) {
        case 0: {
          title = 'Подержанные автомобили';
          break;
        }
        case 1: {
          title = 'Новые автомобили';
          break;
        }
        default: {
          title = 'Автомобили';
          break;
        }
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

    return !title || title === 'Автомобили' ? 'Подбор автомобиля' : title;
  };

  handleFilterChange = (name, value) => {
    const {
      filters: { data: filters },
      dispatch,
    } = this.props;
    dispatch(filtersActions.changeFilter(name, value));

    if (name === FILTER_NAMES.MARK && value > 0) {
      dispatch(filtersActions.getCarFilter({ markId: value, loadMarks: false, loadModels: true }));
    }

    if (name === FILTER_NAMES.MODEL && value > 0) {
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
      query = _omit(location.query, name);
      if (value > 0) {
        query[`${name}`] = value;
      }
    }

    if (!_isEqual(location.query, query)) {
      history.push(`${location.pathname}?${qs.stringify(query)}`);
    }
  };

  handleFilterApply = () => {
    const {
      location,
      history,
      layout,
      filters: { data: filters },
    } = this.props;

    const params = Object.keys(filters).reduce((acc, key) => {
      switch (filters[key].type) {
        case FILTER_TYPES.CHECKBOX: {
          const { active } = filters[key];
          if (active === -1) {
            break;
          }
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

    if (!_isEqual(location.query, query)) {
      history.push(`${location.pathname}?${qs.stringify(query)}`);

      this.setState({
        title: this.getActualTitle(),
      });
    }

    if (layout.isMobile) {
      this.handleCloseModal();
    }
  };

  handleGoToPage = page => {
    const { history, location } = this.props;

    const query = { ...location.query, page };
    history.push(`${location.pathname}?${qs.stringify(query)}`);
  };

  handleOpenModal = () => this.setState({ modalOpen: true });

  handleCloseModal = () => this.setState({ modalOpen: false });

  handleResetFilter = filter => () => {
    let value;
    switch (filter.type) {
      case FILTER_TYPES.CHECKBOX:
      case FILTER_TYPES.SELECT: {
        value = -1;
        break;
      }
      case FILTER_TYPES.RANGE: {
        if (filter.value !== undefined && filter.secondPart !== undefined) {
          if (filter.side === 'min') {
            value = { min: filter.value, max: filter.secondPart };
          }
          if (filter.side === 'max') {
            value = { min: filter.secondPart, max: filter.value };
          }
        }
        break;
      }
      default: {
        break;
      }
    }

    if (!value) {
      return;
    }

    this.handleFilterChange(filter.key, value);
    setTimeout(() => this.handleFilterApply(), 0);
  };

  renderSideFilter = () => {
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
  };

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

  renderMobileFilters() {
    const {
      filters: { data: filters },
      location,
    } = this.props;

    const activeFilters = [...FILTERS_SORT.SIDE.TOP, ...FILTERS_SORT.SIDE.BOTTOM].reduce(
      (acc, key) => {
        const filter = filters[key];
        if (!filter || !location.query[key]) {
          return acc;
        }

        switch (filter.type) {
          case FILTER_TYPES.SELECT:
          case FILTER_TYPES.CHECKBOX: {
            if (filter.active !== -1) {
              const activeOption = filter.options.find(option => option.id === filter.active);
              if (activeOption) {
                acc.push({
                  key,
                  name: activeOption.name,
                  type: filter.type,
                });
              }
            }
            break;
          }
          case FILTER_TYPES.RANGE: {
            if (filter.values[0] !== filter.min) {
              acc.push({
                key,
                name: `> ${
                  key === FILTER_NAMES.YEAR ? filter.values[0] : formatNumber(filter.values[0])
                }${filter.unit}`,
                type: filter.type,
                side: 'min',
                value: filter.min,
                secondPart: filter.values[1],
              });
            }
            if (filter.values[1] !== filter.max) {
              acc.push({
                key,
                name: `< ${
                  key === FILTER_NAMES.YEAR ? filter.values[1] : formatNumber(filter.values[1])
                }${filter.unit}`,
                type: filter.type,
                side: 'max',
                value: filter.max,
                secondPart: filter.values[0],
              });
            }
            break;
          }
          default: {
            break;
          }
        }

        return acc;
      },
      []
    );

    return (
      <div className={styles.mobileFilters}>
        {activeFilters.length ? (
          <div className={styles.tagList}>
            {activeFilters.map(activeFilter => (
              <div key={`${activeFilter.key}${activeFilter.side || ''}`} className={styles.tagItem}>
                <span className={styles.tagName}>{activeFilter.name}</span>
                <button
                  type="button"
                  className={styles.tagButton}
                  onClick={this.handleResetFilter(activeFilter)}
                >
                  <CloseIcon className={styles.tagIcon} />
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <Button
          className={styles.filterButton}
          text={
            <div className={styles.buttonText}>
              <FilterIcon className={styles.buttonIcon} />
              Фильтры
            </div>
          }
          onClick={this.handleOpenModal}
        />
      </div>
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
    const { title, modalOpen } = this.state;
    const { layout } = this.props;

    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.wrapper}>
            {!layout.isMobile && this.renderSideFilter()}
            <div className={styles.content}>
              <div className={styles.head}>
                <h1 className={styles.title}>{title}</h1>
                {this.renderTopFilters()}
              </div>
              {layout.isMobile && this.renderMobileFilters()}
              {this.renderContent()}
            </div>
          </div>
        </Container>
        <Modal
          id="filters-modal"
          title="Фильтры"
          open={modalOpen}
          isFullScreen
          onClose={this.handleCloseModal}
        >
          {this.renderSideFilter()}
        </Modal>
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

export default connect(mapStateToProps)(withLayoutContext(CarsPage));
