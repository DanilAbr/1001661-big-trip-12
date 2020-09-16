const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const getRandomBoolean = () => Math.random() > 0.5;
const capitalizeFirstLetter = (text) => `${text[0].toUpperCase()}${text.slice(1)}`;
const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomObjectItem = (obj) =>
  obj[Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)]];

export {
  getRandomInteger,
  getRandomArrayItem,
  getRandomBoolean,
  getRandomObjectItem,
  capitalizeFirstLetter,
  updateItem
};
