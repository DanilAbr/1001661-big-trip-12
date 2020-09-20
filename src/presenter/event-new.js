import EventEditView from '../view/event-edit';
import {generateId} from '../mock/event';
import {render, RenderPosition, remove} from '../utils/render';
import {UserAction, UpdateType} from '../const';

export default class EventNew {
  constructor(eventsContainer, changeData) {
    this._eventsContainer = eventsContainer;
    this._changeData = changeData;

    this._newEventComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onEscKeyDown = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._newEventComponent !== null) {
      return;
    }

    this._newEventComponent = new EventEditView(false);
    this._newEventComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._newEventComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventsContainer, this._newEventComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._newEventComponent === null) {
      return;
    }

    remove(this._newEventComponent);
    this._newEventComponent = null;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, event)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
