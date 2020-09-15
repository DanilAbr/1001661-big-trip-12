import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Event {
  constructor(eventsContainer, event) {
    this._eventsContainer = eventsContainer;
    this._event = event;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormRollupClick = this._handleFormRollupClick.bind(this);
  }

  init(event) {
    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    this._eventComponent.setRollupClickHandler(this._handleRollupClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormRollupClickHandler(this._handleFormRollupClick);

    render(this._eventsContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToEvent();
    }
  }

  _handleRollupClick() {
    this._replaceEventToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToEvent();
  }

  _handleFormRollupClick() {
    this._replaceFormToEvent();
  }
}
