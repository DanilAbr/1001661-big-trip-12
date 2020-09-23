import InfoView from './view/info';
import NewEventButtonView from './view/new-event-button';
import MenuView from './view/menu';
import FilterPresenter from './presenter/filter';
import TripPresenter from './presenter/trip';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import {generateEvent} from './mock/event';
import {render, RenderPosition} from './utils/render';

const EVENTS_COUNT = 3;
const events = new Array(EVENTS_COUNT) // Создаём массив евентов
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

// Создаём модель евентов
// Добавляем евенты в модель
const eventsModel = new EventsModel();
eventsModel.setEvents(events);


// Находим header
// Рендерим в header информацию о маршруте
const headerElement = document.querySelector(`.trip-main`);
render(headerElement, new InfoView(events), RenderPosition.AFTERBEGIN);


// Создаём экземпляр кнопки New_event
// Рендерим кнопку New_event в header
const newEventButtonComponent = new NewEventButtonView();
render(headerElement, newEventButtonComponent, RenderPosition.BEFOREEND);


// Находим контейнер для меню
// Рендерим меню
const controlsElement = headerElement.querySelector(`.trip-main__trip-controls`);
render(controlsElement, new MenuView(), RenderPosition.BEFOREEND);


// Создаём экземпляр модели фильтров
// Создаём экземпляр презентера фильтров
// Передаём ему контейнер для меню и модель фильтров
// У презентера фильтров вызываем метод инициализации init
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(controlsElement, filterModel);
filterPresenter.init();


const mainContainerElement = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(mainContainerElement, eventsModel, filterModel);

tripPresenter.init();

newEventButtonComponent.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
