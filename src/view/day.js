import Abstract from '../view/abstract';

const createDayTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day extends Abstract {
  getTemplate() {
    return createDayTemplate();
  }
}
