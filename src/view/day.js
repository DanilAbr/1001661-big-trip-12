const createDayTemplate = (day, index) => {
  const dayNumber = index + 1;
  const monthName = new Intl.DateTimeFormat(`en-US`, {month: `long`}).format;
  const month = monthName(day[0].startDate).slice(0, 3);
  const dayOfTheMonth = day[0].startDate.getDate();
  const date = `${month} ${dayOfTheMonth}`;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="2019-03-18">${date}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export {createDayTemplate};
