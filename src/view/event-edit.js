import SmartView from './smart';
import {getPlaceholder} from '../utils/event';
import {getFormatedInputDatetime} from '../utils/datetime';
import {eventTypes, cities} from '../const';
import {capitalizeFirstLetter} from '../utils/common';
import {BLANK_EVENT} from '../mock/event';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createContainer = (isEventNew) => // Ask ???
  `${isEventNew ? `` : `<li class="trip-events__item">`}<form class="${isEventNew ? `trip-events__item` : ``} event event--edit" action="#" method="post">`;

const createTypeGroupListTemplate = (activities) =>
  activities.length < 0 ? `` : activities.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>`).join(`\n`);

const createTypeListMarkup = () => {
  const transferTypesList = createTypeGroupListTemplate(eventTypes.drive);
  const activityTypesList = createTypeGroupListTemplate(eventTypes.stopping);

  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transferTypesList}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${activityTypesList}
      </fieldset>
    </div>`
  );
};

const createCitiesDatalist = () =>
  cities.length < 0 ? `` : cities.map((city) =>
    `<option value="${city}"></option>`).join(`\n`);

const getOptionsMarkup = (options) =>
  options.length < 0 ? `` : options.map(({name, price}, index) =>
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${name}"
        type="checkbox"
        name="event-offer-${name}"
        ${index < 3 ? `checked` : ``}
      >
      <label class="event__offer-label" for="event-offer-${name}">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`).join(`\n`);

const createFavoriteMarkup = (isFavorite) =>
  `<input
    id="event-favorite-1"
    class="event__favorite-checkbox  visually-hidden"
    type="checkbox"
    name="event-favorite"
    ${isFavorite ? `checked` : ``}
  />
  <label class="event__favorite-btn" for="event-favorite-1">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </label>`;

const createFormRollupButton = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;

const createEventEditTemplate = (event, isEventNew) => {
  const {city, type, price, startDate, endDate, options, isFavorite} = event;

  const container = createContainer(isEventNew);
  const typeList = createTypeListMarkup();
  const eventLabel = `${capitalizeFirstLetter(type)} ${getPlaceholder(type)}`;
  const citiesDatalist = createCitiesDatalist(cities);
  const startDateTime = getFormatedInputDatetime(startDate);
  const endDatetime = getFormatedInputDatetime(endDate);
  const optionsMarkup = getOptionsMarkup(options);
  const favoriteMarkup = createFavoriteMarkup(isFavorite);
  const formRollupButton = createFormRollupButton();

  return (
    `${container}
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt=${type}>
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${typeList}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventLabel}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${citiesDatalist}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDatetime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        ${isEventNew ? `` : favoriteMarkup + formRollupButton}
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${optionsMarkup}
          </div>
        </section>
      </section>
    </form>
    ${isEventNew ? `` : `</li>`}`
  );
};

export default class EventEdit extends SmartView {
  constructor(isEventNew = false, event = BLANK_EVENT) {
    super();

    this._isEventNew = isEventNew;
    this._data = EventEdit.parseEventToData(event);
    this._flatpicker = null;

    if (!this._isEventNew) {
      this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
      this._formRollupClickHandler = this._formRollupClickHandler.bind(this);
    }

    this._saveClickHandler = this._saveClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._typeInputHandler = this._typeInputHandler.bind(this);
    this._startDateInputChangeHandler = this._startDateInputChangeHandler.bind(this);
    this._endDateInputChangeHalder = this._endDateInputChangeHalder.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setFlatpicker();
  }

  removeElement() {
    super.removeElement();
    this._removeFlatpicker();
  }

  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._isEventNew);
  }

  restoreHandlers() { // Ask ??? Когда ???
    this._setFlatpicker();
    this._setInnerHandlers();
    this.setDeleteClickHandler(this._callback.deleteClick);

    if (this._isEventNew) {
      this.setSaveClickHandler(this._callback.saveClick);
    } else {
      this.setFormRollupClickHandler(this._callback.formRollupClick);
      this.setFormSubmitHandler(this._callback.formSubmit);
    }
  }

  _removeFlatpicker() {
    if (this._flatpicker) {
      this._flatpicker.destroy();
      this._flatpicker = null;
    }
  }

  _setFlatpicker() {
    this._removeFlatpicker();

    this._flatpicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.startDate,
          onChange: this._startDateInputChangeHandler,
          maxDate: this._data.endDate,
          enableTime: true
        }
    );

    this._flatpicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.endDate,
          minDate: this._data.startDate,
          onChange: this._endDateInputChangeHalder,
          enableTime: true,
        }
    );
  }

  _setInnerHandlers() { // Ask ???
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceInputHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeInputHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._cityInputHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _formRollupClickHandler(evt) {
    evt.preventDefault();
    this._callback.formRollupClick();
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    const prevPrice = this._data.price;

    this.updateData({price: evt.target.value}, true);

    if (!(Number.isInteger(+this._data.price)) || (+this._data.price < 0)) {
      this.updateData({price: prevPrice});
    }
  }

  _typeInputHandler(evt) {
    evt.preventDefault();
    this.updateData({type: evt.target.value});
  }

  _cityInputHandler(evt) { // Ask ???
    evt.preventDefault();
    const prevCity = this._data.city;

    this.updateData({city: evt.target.value}, true);

    if (cities.includes(this._data.city) === false) {
      this.updateData({city: prevCity});
    }
  }

  _startDateInputChangeHandler(selectedDates) {
    this.updateData({startDate: selectedDates[0]});
  }

  _endDateInputChangeHalder(selectedDates) {
    this.updateData({endDate: selectedDates[0]});
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseEventToData(this._data));
  }

  _saveClickHandler(evt) {
    evt.preventDefault();
    this._callback.saveClick(this._data);
  }

  setSaveClickHandler(callback) {
    this._callback.saveClick = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._saveClickHandler);
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormRollupClickHandler(callback) {
    this._callback.formRollupClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formRollupClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }

  static parseEventToData(event) { // Ask Что такое статичный метод?
    return Object.assign({}, event);
  }
}
