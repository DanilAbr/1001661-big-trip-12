const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const render = (element, template, position = `beforeend`) =>
  element.insertAdjacentHTML(position, template);

const getRandomArrayItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomBoolean = () =>
  Math.random() > 0.5;

export {render, getRandomArrayItem, getRandomInteger, getRandomBoolean};
