const humanizeDate = (date) => {
  const month = date.toLocaleString(`en-US`, {month: `short`});
  const day = date.getDate();

  return `${month} ${day}`;
};

const getFormatedHours = (date) => {
  const hours = (`0` + date.getHours()).slice(-2);
  const minutes = (`0` + date.getMinutes()).slice(-2);

  return `${hours}:${minutes}`;
};

const getFormatedDate = (date, separator) => {
  const currentDate = new Date(date);
  const formatedDate = currentDate.toLocaleDateString().split(`.`).join(separator);

  return formatedDate;
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

export {humanizeDate, getWeightForNullTime, sortTime, sortPrice, getFormatedHours, getFormatedDate};
