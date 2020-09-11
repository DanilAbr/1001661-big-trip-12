import DaysContainerView from '../view/days-container';
import SortView from '../view/sort';
import DayView from '../view/day';
import DayInfoView from '../view/day-info';
import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import NoEventsView from '../view/no-events';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {sortTime, sortPrice} from '../utils/event';
import {SortType} from '../const';

export default class Trip {
  constructor(TripContainer) {
    this._tripContainer = TripContainer;
    this._currentSortType = SortType.DEFAULT;
    this._days = [];

    this._daysContainerComponent = new DaysContainerView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }


  init(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();

    this._renderBoard();
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
    this._clearTaskList();
    this._renderBoard();
  }


  _renderSort(sortType) {
    this._sortComponent = new SortView(sortType);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }


  _renderDaysContainer() {
    render(this._tripContainer, this._daysContainerComponent, RenderPosition.BEFOREEND);
  }


  _getDays(events) {
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
    this._days = this._getDays(events);

    this._days.forEach((day, index) => {
      this._dayComponent = new DayView();
      this._dayInfoComponent = new DayInfoView(day, index, this._currentSortType);

      render(this._daysContainerComponent, this._dayComponent, RenderPosition.BEFOREEND);
      render(this._dayComponent, this._dayInfoComponent, RenderPosition.AFTERBEGIN);
    });
  }


  _renderEvent(eventsContainer, event) {
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

    render(eventsContainer, eventComponent, RenderPosition.BEFOREEND);
  }


  _renderEvents(days) {
    const eventsContaners = this._daysContainerComponent.getElement().querySelectorAll(`.trip-events__list`);

    eventsContaners.forEach((eventsContainer, index) =>
      days[index].map((event) => this._renderEvent(eventsContainer, event)));
  }


  _renderNoEvents() {
    render(this._tripContainer, new NoEventsView(), RenderPosition.BEFOREEND);
  }


  _clearTaskList() {
    remove(this._sortComponent);
    remove(this._daysContainerComponent);
  }


  _renderBoard() {
    if (this._events.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort(this._currentSortType);
    this._renderDaysContainer();
    this._renderDays(this._events);
    this._renderEvents(this._days);
  }
}
