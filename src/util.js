import {RenderPosition} from './const.js';

const humanizeDate = (date) => {
  const month = date.toLocaleString(`en-US`, {month: `short`});
  const day = date.getDate();

  return `${month} ${day}`;
};

const render = (container, element, position) => {
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

export {
  render,
  createElement,
  humanizeDate
};
