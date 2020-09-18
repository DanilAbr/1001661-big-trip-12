import InfoView from './view/trip-info';
import PageMenuView from './view/menu';
import FiltersView from './view/filters';
import TripPresenter from './presenter/trip';
import EventsModel from './model/events';
import {render, RenderPosition} from './utils/render';
import {generateEvent} from './mock/event';
import {EVENTS_COUNT} from './const';

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

console.log(eventsModel)

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-main__trip-controls`);
const mainContainerElement = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(mainContainerElement, eventsModel);

render(headerElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(controlsElement, new PageMenuView(), RenderPosition.AFTERBEGIN);
render(controlsElement, new FiltersView(), RenderPosition.BEFOREEND);

tripPresenter.init(events);
