const render = (element, template, position = `beforeend`) =>
  element.insertAdjacentHTML(position, template);

export {render};
