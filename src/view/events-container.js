import AbstractView from './abstract.js';

const createEventsContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class EventsContainer extends AbstractView {
  getTemplate() {
    return createEventsContainerTemplate();
  }
}
