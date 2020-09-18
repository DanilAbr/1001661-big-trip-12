const EVENTS_COUNT = 10;

const cities = [`Moscow`, `Barcelona`, `Buenos Aires`, `Los Angeles`];
const eventTypes = {
  stopping: [`check-in`, `sightseeing`, `restaurant`],
  drive: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]
};

const optionsArray = [{
  name: `Order Uber`,
  price: `20`,
},
{
  name: `Add luggage`,
  price: `50`,
},
{
  name: `Switch to comport`,
  price: `80`,
},
{
  name: `Rent a car`,
  price: `200`,
},
{
  name: `Add breakfast`,
  price: `50`,
}];

const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export {EVENTS_COUNT, eventTypes, optionsArray, cities, SortType, UpdateType, UserAction};
