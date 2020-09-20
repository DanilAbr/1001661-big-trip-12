import {eventTypes} from '../const';

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

const getPlaceholder = (type) => eventTypes.drive.includes(type) ? `to` : `in`;

export {
  getWeightForNullTime,
  sortTime,
  sortPrice,
  getPlaceholder,
};
