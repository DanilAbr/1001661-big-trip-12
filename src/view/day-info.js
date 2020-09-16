import AbstractView from './abstract';
import {formatEventDate, getFormatedDate} from '../utils/event';

const createDayTemplate = (day, index, sortType) => {
  const dayNumber = index + 1;
  const date = formatEventDate(day[0].startDate);
  const datetime = getFormatedDate(day[0].startDate, `-`);

  return (
    `<div class="day__info">
      ${sortType === `default`
      ? `<span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime=${datetime}>${date}</time>`
      : ``}
    </div>`
  );
};

export default class Day extends AbstractView {
  constructor(day, index, sortType) {
    super();
    this._day = day;
    this._index = index;
    this._sortType = sortType;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._index, this._sortType);
  }
}
