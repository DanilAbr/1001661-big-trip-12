import AbstractView from './abstract';
import {getFormatedHours, getFormatedDate, getPlaceholder, getDuration} from '../utils/event';
import {capitalizeFirstLetter} from '../utils/common';

const getFormatedDatetime = (date) => {
  const formatedDate = getFormatedDate(date, `-`);
  const formatedTime = getFormatedHours(date);

  return `${formatedDate}T${formatedTime}`;
};

const getOptionsTemplate = (options) =>
  options.length < 0 ? `` : options.map(({name, price}) => (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  )).join(`\n`);

const createEventTemplate = (event) => {
  const {city, type, price, startDate, endDate, options} = event;

  const upperType = capitalizeFirstLetter(type);
  const eventTitle = `${upperType} ${getPlaceholder(type)} ${city}`;
  const startHours = getFormatedHours(startDate);
  const endHours = getFormatedHours(endDate);
  const startDatetime = getFormatedDatetime(startDate);
  const endDatetime = getFormatedDatetime(endDate);
  const duration = getDuration(startDate, endDate);
  const optionsMarkup = getOptionsTemplate(options.slice(0, 3));

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${startDatetime}>${startHours}</time>
            &mdash;
            <time class="event__end-time" datetime=${endDatetime}>${endHours}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${optionsMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;

    this._rollupClickHandler = this._rollupClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _rollupClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupClickHandler);
  }
}
