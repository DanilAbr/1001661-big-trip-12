import DaysContainerView from '../view/days-container';
import SortView from '../view/sort';
import DayView from '../view/day';
import DayInfoView from '../view/day-info';
import NoEventsView from '../view/no-events';
import {render, RenderPosition, remove} from '../utils/render';
import EventPresenter from './event';
import {sortTime, sortPrice} from '../utils/event';
import {filter} from '../utils/filter';
import {SortType, UpdateType, UserAction} from '../const';

export default class Trip {
  constructor(TripContainer, eventsModel, filterModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._tripContainer = TripContainer;
    this._currentSortType = SortType.DEFAULT;
    this._days = [];
    this._eventPresenter = {};

    this._daysContainerComponent = new DaysContainerView();
    this._noEventsComponent = new NoEventsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredEvents.sort(sortTime);
      case SortType.PRICE:
        return filtredEvents.sort(sortPrice);
    }

    return filtredEvents;
  }

  _handleModeChange() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _renderSort(sortType) {
    this._sortComponent = new SortView(sortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
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
    const eventPresenter = new EventPresenter(eventsContainer, event, this._handleViewAction, this._handleModeChange);

    eventPresenter.init(event);

    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents(days) {
    const eventsContainers = this._daysContainerComponent.getElement().querySelectorAll(`.trip-events__list`);

    eventsContainers.forEach((eventsContainer, index) =>
      days[index].map((event) => this._renderEvent(eventsContainer, event)));
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._daysContainerComponent);
    remove(this._noEventsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    const events = this._getEvents();

    if (events.lenght === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort(this._currentSortType);
    this._renderDays(events);
    this._renderEvents(this._days);
  }
}
