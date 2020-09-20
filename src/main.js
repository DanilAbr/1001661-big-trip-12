import InfoView from './view/trip-info';
import PageMenuView from './view/menu';
import {generateEvent} from './mock/event';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import {render, RenderPosition} from './utils/render';

const EVENTS_COUNT = 3;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-main__trip-controls`);
const mainContainerElement = document.querySelector(`.trip-events`);

render(headerElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(controlsElement, new PageMenuView(), RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter(mainContainerElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(controlsElement, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
