import {createTripInfoTemplate} from './view/trip-info.js';
import {createPageMenuTemplate} from './view/page-menu.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createEventsContainerTemplate} from './view/events-container.js';
import {createDayTemplate} from './view/day.js';
// import {createEventEditTemplate} from './view/event-edit.js';
import {createEventTemplate} from './view/event.js';
import {renderTemplate} from './util.js';
import {generateEvent} from './mock/event.js';
import {EVENTS_COUNT} from './const.js';

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => {
    return a.startDate.getTime() - b.startDate.getTime();
  });

const pageHeaderElement = document.querySelector(`.page-header`);
const pageMainElement = document.querySelector(`.page-main`);
const tripControlsElement = pageHeaderElement.querySelector(`.trip-controls`);
const tripMenuTitleElement = tripControlsElement.querySelector(`h2`);
const mainContentElement = pageMainElement.querySelector(`.trip-events`);

renderTemplate(tripControlsElement, createTripInfoTemplate(events), `beforebegin`);
renderTemplate(tripMenuTitleElement, createPageMenuTemplate(), `afterend`);
renderTemplate(tripControlsElement, createTripFiltersTemplate());
renderTemplate(mainContentElement, createTripSortTemplate());
renderTemplate(mainContentElement, createEventsContainerTemplate());

const days = events
  .slice(1)
  .reduce((summ, currentEvent) => {
    const currentDate = currentEvent.startDate.getDate();
    const currentDay = summ[summ.length - 1];
    const lastEvent = currentDay[0];
    const lastEventDate = lastEvent.startDate.getDate();

    if (currentDate === lastEventDate) {
      currentDay.push(currentEvent);
    } else {
      summ.push([currentEvent]);
    }

    return summ;
  }, [[events[0]]]);

const daysContainerElement = mainContentElement.querySelector(`.trip-days`);

days.forEach((day, index) => {
  renderTemplate(daysContainerElement, createDayTemplate(day, index));
});

const daysElements = daysContainerElement.querySelectorAll(`.trip-events__list`);

daysElements.forEach((daysElement, index) => {
  days[index].map((event) => renderTemplate(daysElement, createEventTemplate(event)));
});

// render(daysElements[0], createEventEditTemplate(), `afterbegin`);
