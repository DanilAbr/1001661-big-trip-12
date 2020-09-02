import {createElement} from "../util.js";

const createEventsContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class EventsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
