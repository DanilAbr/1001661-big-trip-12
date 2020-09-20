const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomBoolean = () => Math.random() > 0.5;
const capitalizeFirstLetter = (text) => `${text[0].toUpperCase()}${text.slice(1)}`;
const getRandomArray = (items) => items.filter(() => getRandomBoolean());
const getRandomItemOfArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomObjectItem = (obj) =>
  obj[Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)]];

export {
  getRandomInteger,
  getRandomItemOfArray,
  getRandomBoolean,
  getRandomObjectItem,
  capitalizeFirstLetter,
  getRandomArray
};
