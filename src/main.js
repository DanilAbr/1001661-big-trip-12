import InfoView from './view/trip-info';
import PageMenuView from './view/menu';
import FiltersView from './view/filters';
import BoardPresenter from './presenter/trip';
import {render, RenderPosition} from './utils/render';
import {generateEvent} from './mock/event';
import {EVENTS_COUNT} from './const';

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-main__trip-controls`);
const mainContainerElement = document.querySelector(`.trip-events`);
const boardPresenter = new BoardPresenter(mainContainerElement);

render(headerElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(controlsElement, new PageMenuView(), RenderPosition.AFTERBEGIN);
render(controlsElement, new FiltersView(), RenderPosition.BEFOREEND);

boardPresenter.init(events);
