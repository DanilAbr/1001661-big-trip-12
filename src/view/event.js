const generateOptionsTemplate = (name, price) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const generateOptionsMarkup = (options) => {
  return options.length > 0
    ? options.map(({name, price}) => generateOptionsTemplate(name, price)).join(`\n`)
    : ``;
};

const getImageName = (eventType) => {
  if (eventType === `Check`) {
    eventType += `-in`;
  }

  return eventType.toLowerCase();
};

const getformatedHours = (date) => {
  const hours = (`0` + date.getHours()).slice(-2);
  const minutes = (`0` + date.getMinutes()).slice(-2);

  return `${hours}:${minutes}`;
};

const getFormatedDatetime = (date) => {
  const currentDate = new Date(date);
  const formatedDate = currentDate.toLocaleDateString().split(`.`).join(`-`);
  const formatedTime = getformatedHours(currentDate);

  return `${formatedDate}T${formatedTime}`;
};

const getDuration = (start, end) => {
  const duration = ((end.getTime() - start.getTime()) / (1000 * 60));
  const days = Math.floor(duration / (60 * 24));
  const hours = Math.floor((duration % (60 * 24)) / 60);
  const minutes = Math.floor(((duration % (60 * 24)) % 60));

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours >= 1) {
    return ` ${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};

const createEventTemplate = (event) => {
  const {city, type, price, startDate, endDate, options} = event;

  const imageName = getImageName(type);
  const startHours = getformatedHours(startDate);
  const endHours = getformatedHours(endDate);
  const startDatetime = getFormatedDatetime(startDate);
  const endDatetime = getFormatedDatetime(endDate);
  const duration = getDuration(startDate, endDate);
  const optionsMarkup = generateOptionsMarkup(options);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${imageName}.png" alt="${type} icon">
      </div>
      <h3 class="event__title">${type} to ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDatetime}">${startHours}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDatetime}">${endHours}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${optionsMarkup}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export {createEventTemplate};
