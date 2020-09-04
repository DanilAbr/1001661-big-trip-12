import EventsContainerView from '../view/events-container.js';
import SortView from '../view/sort.js';
import DayView from '../view/day.js';
import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import NoEventsView from "../view/no-events.js";
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Trip {
  constructor(TripContainer) {
    this._tripContainer = TripContainer;

    this._sortComponent = new SortView();
    this._eventsContainerComponent = new EventsContainerView();
    this._dayComponent = new DayView();
    this._noEventsComponent = new NoEventsView();
  }


  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    this._renderBoard();
  }


  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }


  _renderEventsContainer() {
    render(this._tripContainer, this._eventsContainerComponent, RenderPosition.BEFOREEND);
  }


  _renderDays(events) {
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

    this._days = days.slice();

    days.forEach((day, index) =>
      render(this._eventsContainerComponent, new DayView(day, index), RenderPosition.BEFOREEND));
  }


  _renderEvent(daysElement, event) {
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

    render(daysElement, eventComponent, RenderPosition.BEFOREEND);
  }


  _renderEvents(days) {
    const daysElements = document.querySelectorAll(`.trip-events__list`);

    daysElements.forEach((daysElement, index) =>
      days[index].map((event) => this._renderEvent(daysElement, event)));
  }


  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }


  _renderBoard() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsContainer();
    this._renderDays(this._tripEvents);
    this._renderEvents(this._days);
  }
}
