const EVENTS_COUNT = 7;

const cities = [`Moscow`, `Barcelona`, `Buenos Aires`, `Los Angeles`];
const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];
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
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export {EVENTS_COUNT, eventTypes, optionsArray, RenderPosition, cities};
