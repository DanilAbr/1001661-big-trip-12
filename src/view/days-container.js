import AbstractView from './abstract';

const createDaysContainerTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventsContainer extends AbstractView {
  getTemplate() {
    return createDaysContainerTemplate();
  }
}
