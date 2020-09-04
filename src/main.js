import InfoView from './view/trip-info.js';
import PageMenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import EventsContainer from './view/events-container.js';
import DayView from './view/day.js';
import EventView from './view/event.js';
import EventEditView from './view/event-edit.js';
import NoEventsView from "./view/no-events.js";
import {render} from './util.js';
import {generateEvent} from './mock/event.js';
import {EVENTS_COUNT, RenderPosition} from './const.js';

const events = new Array(EVENTS_COUNT)
  .fill(``)
  .map(generateEvent)
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () =>
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());

  const replaceFormToEvent = () =>
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setRollupClickHandler(() => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

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

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-main__trip-controls`);
const mainContainerElement = document.querySelector(`.trip-events`);

render(headerElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);
render(controlsElement, new PageMenuView().getElement(), RenderPosition.AFTERBEGIN);
render(controlsElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(mainContainerElement, new EventsContainer().getElement(), RenderPosition.BEFOREEND);

const daysContainerElement = mainContainerElement.querySelector(`.trip-days`);

if (events.length === 0) {
  render(daysContainerElement, new NoEventsView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(mainContainerElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);

  days.forEach((day, index) =>
    render(daysContainerElement, new DayView(day, index).getElement(), RenderPosition.BEFOREEND));

  const daysElements = daysContainerElement.querySelectorAll(`.trip-events__list`);

  daysElements.forEach((daysElement, index) =>
    days[index].map((event) => renderEvent(daysElement, event)));
}
