import Observer from '../utils/observer';
import {FilterType} from '../const';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateFilter, filter) {
    this._activeFilter = filter;
    this._notify(updateFilter, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
