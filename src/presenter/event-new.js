import EventEditView from '../view/event-edit';
import {generateId} from '../mock/event';
import {remove} from '../utils/render';
import {UserAction, UpdateType} from '../const';

export default class EventNew {
  constructor(eventsContainer, changeData) {
    this._eventsContainer = eventsContainer;
    this._changeData = changeData;

    this._newEventComponent = null;

    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(daysContainer) {
    if (this._newEventComponent !== null) {
      return;
    }

    this._newEventComponent = new EventEditView(true);
    this._newEventComponent.setSaveClickHandler(this._handleSaveClick);
    this._newEventComponent.setDeleteClickHandler(this._handleDeleteClick);

    this._eventsContainer.insertBefore(this._newEventComponent.getElement(), daysContainer.getElement());

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

  _handleSaveClick(event) {
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
