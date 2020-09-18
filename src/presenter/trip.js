import DaysContainerView from '../view/days-container';
import SortView from '../view/sort';
import DayView from '../view/day';
import DayInfoView from '../view/day-info';
import NoEventsView from '../view/no-events';
import {render, RenderPosition, remove} from '../utils/render';
import EventPresenter from './event';
import {sortTime, sortPrice} from '../utils/event';
import {SortType} from '../const';
import {updateItem} from '../utils/common';

export default class Trip {
  constructor(TripContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._tripContainer = TripContainer;
    this._currentSortType = SortType.DEFAULT;
    this._days = [];
    this._eventPresenter = {};

    this._daysContainerComponent = new DaysContainerView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();

    this._renderBoard();
  }

  _getEventns() {
    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._events.sort(sortTime);
        break;
      case SortType.PRICE:
        this._events.sort(sortPrice);
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    remove(this._sortComponent);
    remove(this._daysContainerComponent);
    this._clearEventList();
    this._renderBoard();
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._sourcedEvents = updateItem(this._sourcedEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderSort(sortType) {
    this._sortComponent = new SortView(sortType);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _getDays(events, sortType) {
    if (sortType === `default`) {
      events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }

    return events
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
  }

  _renderDays(events) {
    render(this._tripContainer, this._daysContainerComponent, RenderPosition.BEFOREEND);

    this._days = this._getDays(events, this._currentSortType);

    this._days.forEach((day, index) => {
      this._dayComponent = new DayView();
      this._dayInfoComponent = new DayInfoView(day, index, this._currentSortType);

      render(this._daysContainerComponent, this._dayComponent, RenderPosition.BEFOREEND);
      render(this._dayComponent, this._dayInfoComponent, RenderPosition.AFTERBEGIN);
    });
  }

  _renderEvent(eventsContainer, event) {
    const eventPresenter = new EventPresenter(eventsContainer, event, this._handleEventChange, this._handleModeChange);

    eventPresenter.init(event);

    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents(days) {
    const eventsContaners = this._daysContainerComponent.getElement().querySelectorAll(`.trip-events__list`);

    eventsContaners.forEach((eventsContainer, index) =>
      days[index].map((event) => this._renderEvent(eventsContainer, event)));
  }

  _renderNoEvents() {
    render(this._tripContainer, new NoEventsView(), RenderPosition.BEFOREEND);
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());

    this._eventPresenter = {};
  }

  _renderBoard() {
    if (this._events.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort(this._currentSortType);
    this._renderDays(this._events);
    this._renderEvents(this._days);
  }
}
