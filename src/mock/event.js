import {getRandomItemOfArray, getRandomInteger, getRandomBoolean, getRandomObjectItem, getRandomArray} from '../utils/common';
import {cities, eventTypes, optionsArray} from './../const';

const getStartDate = () => {
  const maxGap = 1000 * 60 * 60 * 24 * 7;
  const randomGap = getRandomInteger(-maxGap, maxGap);

  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + randomGap);

  return currentDate;
};

const getEndDate = (date) => {
  const currentDate = new Date(date);
  const minGap = 1000 * 60 * 10;
  const maxGap = 1000 * 60 * 60 * 48;
  const randomGap = getRandomInteger(minGap + maxGap);

  currentDate.setTime(date.getTime() + randomGap);

  return currentDate;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomInfo = () =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
    .slice(0, -1).split(`. `)
    .filter(() => getRandomBoolean())
    .join(`. `) + `.`;

const generateEvent = () => {
  const startDate = getStartDate();

  return {
    id: generateId(),
    isFavorite: getRandomBoolean(),
    type: getRandomItemOfArray(getRandomObjectItem(eventTypes)),
    city: getRandomItemOfArray(cities),
    options: getRandomArray(optionsArray),
    price: getRandomInteger(10, 1000),
    startDate,
    endDate: getEndDate(startDate),
    info: getRandomInfo(),
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
  };
};

export {generateEvent, generateId};
