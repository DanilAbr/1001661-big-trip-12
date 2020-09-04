const humanizeDate = (date) => {
  const month = date.toLocaleString(`en-US`, {month: `short`});
  const day = date.getDate();

  return `${month} ${day}`;
};

export {humanizeDate};
