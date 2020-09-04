import InfoView from './view/trip-info.js';
import PageMenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import BoardPresenter from './presenter/trip.js';
import {render, RenderPosition} from './utils/render.js';
import {generateEvent} from './mock/event.js';

const EVENTS_COUNT = 10;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-main__trip-controls`);
const mainContainerElement = document.querySelector(`.trip-events`);

render(controlsElement, new PageMenuView(), RenderPosition.AFTERBEGIN);
render(headerElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(controlsElement, new FiltersView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(mainContainerElement);

boardPresenter.init(events);
