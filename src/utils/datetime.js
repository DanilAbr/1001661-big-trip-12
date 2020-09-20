import moment from 'moment';

const getFormatedDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`MMM D`);
};

const getFormatedTime = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`HH:mm`);
};

const getFormatedDatetime = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`YYYY-MM-DDTHH:mm`);
};

const getFormatedInputDatetime = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`DD/MM/YY HH:mm`);
};

const getFormatedInfoDatetime = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`YYYY-MM-DD`);
};

const getDuration = (start, end) => {
  if (!(start instanceof Date) || !(start instanceof Date)) {
    return ``;
  }

  const durationMs = moment(end).diff(moment(start));

  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(durationMs / (1000 * 60 * 60) % 24);
  const minutes = Math.floor(durationMs / (1000 * 60)) % 60;

  return `${days ? `${days}D` : ``}
          ${hours ? `${hours}H` : ``}
          ${minutes ? `${minutes}M` : ``}`;
};

const isDatesEqual = (dateA, dateB) => moment(dateA).isSame(dateB);

export {
  getFormatedDate,
  getFormatedTime,
  getFormatedInputDatetime,
  getFormatedDatetime,
  getFormatedInfoDatetime,
  getDuration,
  isDatesEqual
};
