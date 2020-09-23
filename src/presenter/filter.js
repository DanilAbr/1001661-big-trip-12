import FilterView from '../view/filters';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {FilterType, UpdateType} from '../const';

export default class Filter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._currentFilter = null;

    this._filtersComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    // Записываем метод init в модель фильтров
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    // Записываем выбранный фильтр (в первый раз EVERYTHING)
    this._currentFilter = this._filterModel.getFilter();

    // Записываем предыдущий экземпляр компонента фильтров (в первый раз - null)
    const prevFilterComponent = this._filtersComponent;

    // Создаём компонент фильтров, передаём массив фильтров и выбранный фильтр (в первый раз EVERYTHING)
    this._filtersComponent = new FilterView(this._getFilters(), this._currentFilter);

    // Устанавливаем обработчик изменения фильтра, вызываем в нём метод _handleFilterTypeChange
    this._filtersComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filtersComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filtersComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    // Передаём в модель фильтра тип измемнения MAJOR тип фильтра
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: `Everything`,
      },
      {
        type: FilterType.PAST,
        name: `Past`,
      },
      {
        type: FilterType.FUTURE,
        name: `Future`,
      }
    ];
  }
}
