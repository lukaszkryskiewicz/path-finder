import { /*settings,*/ templates, /*select*/ } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;

    thisFinder.step = 1;

    thisFinder.render(element);
    thisFinder.initWidget();

  }

  render(element) {
    const thisFinder = this;

    let pageData = null;
    switch (thisFinder.step) {
      case 1:
        pageData = { title: 'Draw routes', buttonText: 'Finish drawing' };
        break;
      case 2:
        pageData = { title: 'Pick start and finish', buttonText: 'Compute' };
        break;
      case 3:
        pageData = { title: 'The best route is', buttonText: 'Start again' };
        break;
    }

    const generatedHTML = templates.finder(pageData);

    thisFinder.dom = {};
    thisFinder.dom.wrapper = element;
    thisFinder.dom.wrapper.innerHTML = generatedHTML;

    let gridHtml = '';
    for (let x = 1; x <= 10; x++) {
      for (let y = 1; y <= 10; y++) {
        gridHtml += '<div class="field" data-x="' + x + '" data-y="' + y + '"></div>';

        thisFinder.dom.wrapper.querySelector('.finder-grid').innerHTML = gridHtml;
      }
    }
  }

  initWidget() {
    const thisFinder = this;

    thisFinder.button = thisFinder.dom.wrapper.querySelector('.finder-button');
    thisFinder.button.addEventListener('click', function () {
      console.log('test');
    });
  }
}

export default Finder;