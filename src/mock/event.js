import {getRandomArrayItem, getRandomInteger, getRandomBoolean} from './../util.js';
import {cities, eventTypes} from './../const.js';

const options = [{
  name: `Order Uber`,
  price: `20`,
},
{
  name: `Add luggage`,
  price: `50`,
},
{
  name: `Switch to comport`,
  price: `80`,
},
{
  name: `Rent a car`,
  price: `200`,
},
{
  name: `Add breakfast`,
  price: `50`,
}];

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

const generateOptions = () =>
  options.filter(() => getRandomBoolean());

const generateEvent = () => {
  const startDate = generateStartDate();
  const endDate = generateEndDate(startDate);

  return {
    type: getRandomArrayItem(eventTypes),
    city: getRandomArrayItem(cities),
    options: generateOptions(),
    price: getRandomInteger(10, 10000),
    startDate,
    endDate,
  };
};

export {generateEvent};
