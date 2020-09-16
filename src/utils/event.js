import moment from 'moment';
import {eventTypes} from '../const';

const formatEventDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`MMM D`);
};

const getFormatedHours = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`HH:mm`);
};

const getFormatedDate = (date, separator) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`Y${separator}MM${separator}DD`);
};

const getWeightForNullTime = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortTime = (eventA, eventB) => {
  const weight = getWeightForNullTime(eventA, eventB);

  if (weight !== null) {
    return weight;
  }

  const totalTimeA = eventA.startDate.getTime() - eventA.endDate.getTime();
  const totalTimeB = eventB.startDate.getTime() - eventB.endDate.getTime();

  return totalTimeA - totalTimeB;
};

const sortPrice = (eventA, eventB) => {
  const weight = getWeightForNullTime(eventA, eventB);

  if (weight !== null) {
    return weight;
  }

  return eventB.price - eventA.price;
};

const getDuration = (start, end) => {
  if (!(start instanceof Date) || !(start instanceof Date)) {
    return ``;
  }

  start = moment(start);
  end = moment(end);

  const duration = end.diff(start, `minutes`);
  const days = end.diff(start, `days`);
  const hours = Math.floor((duration % 24 % 60));
  const minutes = Math.floor((duration % (60 * 24)) % 60);

  return `${days ? `${days}D` : ``}
          ${hours ? `${hours}H` : ``}
          ${minutes ? `${minutes}M` : ``}`;
};

const getPlaceholder = (type) => eventTypes.drive.includes(type) ? `to` : `in`;

export {
  formatEventDate,
  getWeightForNullTime,
  sortTime,
  sortPrice,
  getFormatedHours,
  getFormatedDate,
  getPlaceholder,
  getDuration
};
