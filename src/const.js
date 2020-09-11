const cities = [`Moscow`, `Barcelona`, `Buenos Aires`, `Los Angeles`];
const eventTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
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

export {eventTypes, optionsArray, cities, SortType};
