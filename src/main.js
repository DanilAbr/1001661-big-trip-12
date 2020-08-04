import {createTripInfoTemplate} from './view/trip-info.js';
import {createPageMenuTemplate} from './view/page-menu.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createEventsContainerTemplate} from './view/events-container.js';
import {createDayTemplate} from './view/day.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {createEventTemplate} from './view/event.js';
import {render} from './util.js';

const EVENT_COUNT = 3;

const pageHeaderElement = document.querySelector(`.page-header`);
const pageMainElement = document.querySelector(`.page-main`);
const tripControlsElement = pageHeaderElement.querySelector(`.trip-controls`);
const tripMenuTitleElement = tripControlsElement.querySelector(`h2`);
const mainContentElement = pageMainElement.querySelector(`.trip-events`);

render(tripControlsElement, createTripInfoTemplate(), `beforebegin`);
render(tripMenuTitleElement, createPageMenuTemplate(), `afterend`);
render(tripControlsElement, createTripFiltersTemplate());
render(mainContentElement, createTripSortTemplate());
render(mainContentElement, createEventsContainerTemplate());

const daysContainerElement = mainContentElement.querySelector(`.trip-days`);

render(daysContainerElement, createDayTemplate());

const eventsContainerElement = daysContainerElement.querySelector(`.trip-events__list`);

render(eventsContainerElement, createEventEditTemplate());

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsContainerElement, createEventTemplate());
}
