import AbstractView from './abstract.js';
import {humanizeDate} from '../util.js';

const getFormatedTotalPeriod = (firstDate, lastDate) => {
  const formatedFirstDate = humanizeDate(firstDate);
  let formatedLastDate = humanizeDate(lastDate);
  const firstEventMonth = firstDate.getMonth();
  const lastEventMonth = lastDate.getMonth();

  formatedLastDate = (firstEventMonth === lastEventMonth)
    ? formatedLastDate.slice(-2)
    : formatedLastDate;

  return `${formatedFirstDate}&nbsp;&mdash;&nbsp;${formatedLastDate}`;
};

const getCenterCity = (events) => {
  let centerCity = events[1].city;
  let cities = [];

  events.forEach((event) => cities.push(event.city));

  if (cities.length > 3) {
    centerCity = `...`;
  }

  return centerCity;
};


const getMainWay = (events) => {
  const firstCity = events[0].city;
  const lastCity = events[events.length - 1].city;
  const centerCity = getCenterCity(events);

  return `${firstCity} &mdash; ${centerCity} &mdash; ${lastCity}`;
};

const getTotalPrice = (events) => {
  let eventsPrices = [];

  events.forEach((event) => eventsPrices.push(event.price));

  const total = eventsPrices
    .reduce((summ, currentPrice) => summ + currentPrice);

  return total;
};

const createTripInfoTemplate = (events) => {
  const firstEventDate = events[0].startDate;
  const lastEventDate = events[events.length - 1].startDate;

  const totalPeriod = getFormatedTotalPeriod(firstEventDate, lastEventDate);
  const mainWay = getMainWay(events);
  const totalPrice = getTotalPrice(events);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${mainWay}</h1>

              <p class="trip-info__dates">${totalPeriod}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
          </section>`;
};

const createNoEventTripInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
            </p>
          </section>`;
};

export default class Info extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    if (this._events.length !== 0) {
      return createTripInfoTemplate(this._events);
    } else {
      return createNoEventTripInfoTemplate(this._events);
    }
  }
}
