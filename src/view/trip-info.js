import AbstractView from './abstract';
import {getFormatedDate} from '../utils/datetime';
import {sortDefault} from '../utils/event';

const getFormatedTotalPeriod = (startDate, endDate) => { // Ask ???
  const firstMonth = startDate.getMonth();
  const lastMonth = endDate.getMonth();

  const firstFormatedDate = getFormatedDate(startDate);
  const lastFormatedDate =
    `${firstMonth === lastMonth
      ? getFormatedDate(endDate).slice(-2)
      : getFormatedDate(endDate)}`;

  return `${firstFormatedDate}&nbsp;&mdash;&nbsp;${lastFormatedDate}`;
};

// const getFormatedTotalPeriod = (start, end) =>
//   `${getFormatedDate(start)}&nbsp;&mdash;&nbsp;
//   ${start.getMonth() === end.getMonth()
//     ? getFormatedDate(end).slice(-2)
//     : getFormatedDate(end)}`;

const getMainWay = (events) =>
  `${events[0].city}
  ${events.length > 1 ? `&mdash; ` : ``}
  ${events.length === 3 ? `${events[1].city} &mdash;` : ``}
  ${events.length > 3 ? `... &mdash;` : ``}
  ${events.length > 1 ? events[events.length - 1].city : ``}`;

const getTotalPrice = (events) => {
  let total = 0;

  events.map(({options, price}) => {
    options.forEach((option) => {
      total += +option.price;
    });

    total += price;
  });

  return total;
};

const createTripInfoTemplate = (events) => {
  let totalPeriod;
  let mainWay;

  if (events.length !== 0) { // Ask Как убрать эту проверку?
    const firstEventDate = events[0].startDate;
    const lastEventDate = events[events.length - 1].startDate;

    totalPeriod = getFormatedTotalPeriod(firstEventDate, lastEventDate);
    mainWay = getMainWay(events);
  }

  const totalPrice = events.length !== 0 ? getTotalPrice(events) : `0`;

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${events.length !== 0
      ? `<div class="trip-info__main">
          <h1 class="trip-info__title">${mainWay}</h1>

          <p class="trip-info__dates">${totalPeriod}</p>
        </div>`
      : ``}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class Info extends AbstractView {
  constructor(events) {
    super();
    this._events = events.sort(sortDefault);
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
