import AbstractView from './abstract.js';
import {humanizeDate} from '../utils/event.js';

const getDatetime = (date) => {
  const year = date.getFullYear();
  const month = (`0` + date.getMonth()).slice(0, 2);
  const dayOfTheMonth = (`0` + date.getDate()).slice(0, 2);

  return `${year}-${month}-${dayOfTheMonth}`;
};

const createDayTemplate = (day, index) => {
  const dayNumber = index + 1;
  const date = humanizeDate(day[0].startDate);
  const datetime = getDatetime(day[0].startDate);

  return `<li class="trip-days__item  day">
            <div class="day__info">
              <span class="day__counter">${dayNumber}</span>
              <time class="day__date" datetime="${datetime}">${date}</time>
            </div>

            <ul class="trip-events__list"></ul>
          </li>`;
};

export default class Day extends AbstractView {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._index);
  }
}
