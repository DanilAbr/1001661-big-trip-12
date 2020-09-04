import {getRandomArrayItem, getRandomInteger, getRandomBoolean} from '../utils/common.js';
import {cities, eventTypes, optionsArray} from './../const.js';

const generateStartDate = () => {
  const maxGap = 1000 * 60 * 60 * 24 * 7;
  const randomGap = getRandomInteger(-maxGap, maxGap);

  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + randomGap);

  return currentDate;
};

const generateEndDate = (date) => {
  const currentDate = new Date(date);
  const minGap = 1000 * 60 * 10;
  const maxGap = 1000 * 60 * 60 * 48;
  const randomGap = getRandomInteger(minGap + maxGap);

  currentDate.setTime(date.getTime() + randomGap);

  return currentDate;
};

const generateOptions = (options) => {
  return options.filter(() => getRandomBoolean());
};

const getRandomInfo = () => {
  const randomSentences = [];
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const sentences = text.slice(0, -1).split(`. `);
  sentences.map((sentence) => getRandomBoolean() ? randomSentences.push(sentence) : ``);

  return randomSentences.join(`. `) + `.`;
};

const generateEvent = () => {
  const type = getRandomArrayItem(eventTypes);
  const city = getRandomArrayItem(cities);
  const options = generateOptions(optionsArray);
  const price = getRandomInteger(10, 10000);
  const startDate = generateStartDate();
  const endDate = generateEndDate(startDate);
  const info = getRandomInfo();

  return {
    type,
    city,
    options,
    price,
    startDate,
    endDate,
    info,
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
  };
};

export {generateEvent};
