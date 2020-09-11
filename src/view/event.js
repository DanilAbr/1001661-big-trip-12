import AbstractView from './abstract';
import {getFormatedHours, getFormatedDate, formatedType} from '../utils/event';

const getFormatedDatetime = (date) => {
  const formatedDate = getFormatedDate(date, `-`);
  const formatedTime = getFormatedHours(date);

  return `${formatedDate}T${formatedTime}`;
};

const getOptionsTemplate = (options) => {
  return options.length > 0
    ? options.map(({name, price}) => (
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>`
    )).join(`\n`)
    : ``;
};

const getDuration = (start, end) => {
  const duration = ((end.getTime() - start.getTime()) / (1000 * 60));
  const days = Math.floor(duration / (60 * 24));
  const hours = Math.floor((duration % (60 * 24)) / 60);
  const minutes = Math.floor(((duration % (60 * 24)) % 60));

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours >= 1) {
    return ` ${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};

const createEventTemplate = (event) => {
  const {city, type, price, startDate, endDate, options} = event;

  const eventType = formatedType(type);
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
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="${eventType} icon">
        </div>
        <h3 class="event__title">${eventType} to ${city}</h3>

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
