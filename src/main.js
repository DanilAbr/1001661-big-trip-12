import InfoView from './view/trip-info.js';
import PageMenuView from './view/menu.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import EventsContainer from './view/events-container.js';
import DayView from './view/day.js';
import EventView from './view/event.js';
import EventEditView from './view/event-edit.js';
import NoEventsView from "./view/no-events.js";
import {render, RenderPosition, replace} from './utils/render.js';
import {generateEvent} from './mock/event.js';

const EVENTS_COUNT = 10;

const events = new Array(EVENTS_COUNT)
  .fill(``)
  .map(generateEvent)
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () =>
    replace(eventEditComponent, eventComponent);

  const replaceFormToEvent = () =>
    replace(eventComponent, eventEditComponent);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const openEventEditForm = () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closeEventEditForm = () => {
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  eventComponent.setRollupClickHandler(() => openEventEditForm());
  eventEditComponent.setFormSubmitHandler(() => closeEventEditForm());
  eventEditComponent.setFormRollupClickHandler(() => closeEventEditForm());

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
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

render(controlsElement, new PageMenuView(), RenderPosition.AFTERBEGIN);
render(headerElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(controlsElement, new FiltersView(), RenderPosition.BEFOREEND);
render(mainContainerElement, new EventsContainer(), RenderPosition.BEFOREEND);

const daysContainerElement = mainContainerElement.querySelector(`.trip-days`);

if (events.length === 0) {
  render(daysContainerElement, new NoEventsView(), RenderPosition.BEFOREEND);
} else {
  render(mainContainerElement, new SortView(), RenderPosition.AFTERBEGIN);

  days.forEach((day, index) =>
    render(daysContainerElement, new DayView(day, index), RenderPosition.BEFOREEND));

  const daysElements = daysContainerElement.querySelectorAll(`.trip-events__list`);

  daysElements.forEach((daysElement, index) =>
    days[index].map((event) => renderEvent(daysElement, event)));
}
