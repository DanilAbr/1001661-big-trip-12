import {RenderPosition} from './const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date) => {
  const month = date.toLocaleString(`en-US`, {month: `short`});
  const day = date.getDate();

  return `${month} ${day}`;
};

const renderElement = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getRandomArrayItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomBoolean = () => Math.random() > 0.5;

export {
  renderElement,
  createElement,
  getRandomArrayItem,
  getRandomInteger,
  getRandomBoolean,
  humanizeDate
};
