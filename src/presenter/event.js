import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import {cities} from '../const';
import {render, RenderPosition, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  constructor(eventsContainer, event, changeData, changeMode) {
    this._eventsContainer = eventsContainer;
    this._event = event;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormRollupClick = this._handleFormRollupClick.bind(this);
    this._onEscKeyDown = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event, cities);

    this._eventComponent.setRollupClickHandler(this._handleRollupClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormRollupClickHandler(this._handleFormRollupClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToEvent();
    }
  }

  _handleRollupClick() {
    this._replaceEventToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToEvent();
  }

  _handleFormRollupClick() {
    this._eventEditComponent.reset(this._event);
    this._replaceFormToEvent();
  }
}
