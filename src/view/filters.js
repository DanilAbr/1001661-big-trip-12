import AbstractView from './abstract';

const createFilterItemsTemplate = (filters, currentFilterType) =>
  filters.map(({type, name}) =>
    `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${type === currentFilterType ? `checked` : ``}
      />
      <label
        class="trip-filters__filter-label"
        for="filter-${name}"
      />${name}</label>
    </div>`).join(``);

const createFiltersTemplate = (filterItems, currentFilterType) =>
  `<div>
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${createFilterItemsTemplate(filterItems, currentFilterType)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters; // Массив фильтров
    this._currentFilter = currentFilterType; // Выбранный фильтр

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value); // Передаёт колбэку значение типа PAST, FUTURE
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
