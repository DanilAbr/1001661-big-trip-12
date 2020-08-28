import {createTripInfoTemplate} from './view/trip-info.js';
import {createPageMenuTemplate} from './view/page-menu.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createEventsContainerTemplate} from './view/events-container.js';
import {createDayTemplate} from './view/day.js';
// import {createEventEditTemplate} from './view/event-edit.js';
import {createEventTemplate} from './view/event.js';
import {render} from './util.js';
import {generateEvent} from './mock/event.js';
import {EVENTS_COUNT} from './const.js';

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => {
    const firstTime = a.startDate.getTime();
    const lastTime = b.startDate.getTime();
    // console.log(a.startDate.getTime());

    return firstTime - lastTime;
  });

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

const days = [[events[0]]];

events.forEach((event, index) => {
  if (index !== 0) {
    // console.log(event);
    const currentDate = event.startDate.getDate();
    const currentDay = days[days.length - 1];
    const lastEvent = currentDay[0];
    const lastEventDate = lastEvent.startDate.getDate();

    if (currentDate === lastEventDate) {
      currentDay.push(lastEvent);
    } else {
      days.push([lastEvent]);
    }
  }
});

console.log('days', days);

// const days = events
//   // .slice(1)
//   .reduce((summ, currentEvent) => {
//     console.log('summ', summ);
//     const currentDate = currentEvent.startDate.getDate();
//     const currentDay = summ[summ.length - 1];
//     const lastEvent = currentDay[0];
//     const lastEventDate = lastEvent.startDate.getDate();

//     // console.log('currentEvent', currentEvent);
//     // console.log('lastEvent', lastEvent);

//     if (currentDate === lastEventDate) {
//       currentDay.push(lastEvent);
//     } else {
//       summ.push([lastEvent]);
//     }

//     console.log('summ', summ);
//     return summ;
//   }, [[events[0]]]);

// console.log('days', days);

// render(daysContainerElement, createDayTemplate(days[0][0]));

// const eventsContainerElements = daysContainerElement.querySelectorAll(`.trip-events__list`);

// render(eventsContainerElements[0], createEventEditTemplate(), `afterbegin`);

// eventsContainerElements.forEach((eventsContainerElement) => {
//   events
//     .map((event) => {
//       render(eventsContainerElement, createEventTemplate(event));
//     });
// });

