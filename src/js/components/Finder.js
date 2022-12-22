import { /*settings,*/ templates, /*select*/ } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;

    thisFinder.step = 1;
    thisFinder.element = element;

    thisFinder.render();

    thisFinder.gridObj = {};
    for (let x = 1; x <= 10; x++) {
      thisFinder.gridObj[x] = {};
      for (let y = 1; y <= 10; y++) {
        thisFinder.gridObj[x][y] = false;
      }

    }

    /*     thisFinder.possibleToClickFields = {};
        for (let x = 1; x <= 10; x++) {
          thisFinder.gridObj[x] = {};
          for (let y = 1; y <= 10; y++) {
            thisFinder.gridObj[x][y] = false;
          }
    
        } */
  }

  render() {
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

    thisFinder.element.innerHTML = generatedHTML;

    let gridHtml = '';
    for (let x = 1; x <= 10; x++) {
      for (let y = 1; y <= 10; y++) {
        gridHtml += '<div class="field" data-x="' + x + '" data-y="' + y + '"></div>';

        thisFinder.element.querySelector('.finder-grid').innerHTML = gridHtml;
      }
    }
    thisFinder.initActions();
  }

  changeStep(newStep) {
    const thisFinder = this;

    thisFinder.step = newStep;
    thisFinder.render();
  }

  initActions() {
    const thisFinder = this;

    if (thisFinder.step === 1) {
      thisFinder.element.querySelector('.finder-button').addEventListener('click', function (event) {
        event.preventDefault();
        thisFinder.changeStep(2);
      });

      thisFinder.element.querySelector('.finder-grid').addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.classList.contains('field')) {
          thisFinder.matchedFields(event.target);
          event.target.classList.remove('possible-to-click');
          console.log(event.target);
        }
      });
    }
  }

  matchedFields(field) {
    const thisFinder = this;

    const coordinates = {
      x: field.getAttribute('data-x'),
      y: field.getAttribute('data-y')
    };
    if (thisFinder.gridObj[coordinates.x][coordinates.y]) {
      thisFinder.gridObj[coordinates.x][coordinates.y] = false;
      field.classList.remove('clicked-field');
    } else {
      if (document.querySelector('.clicked-field')) {
        const edgeFields = [];
        if (coordinates.x > 1) edgeFields.push(thisFinder.gridObj[parseInt(coordinates.x) - 1][coordinates.y]);
        if (coordinates.x < 10) edgeFields.push(thisFinder.gridObj[parseInt(coordinates.x) + 1][coordinates.y]);
        if (coordinates.y > 1) edgeFields.push(thisFinder.gridObj[coordinates.x][parseInt(coordinates.y) - 1]);
        if (coordinates.y < 10) edgeFields.push(thisFinder.gridObj[coordinates.x][parseInt(coordinates.y) + 1]);

        if (!edgeFields.includes(true)) {
          alert('Please choose another field that touches at least one side of already selected route');
          return;
        }
      }
      thisFinder.gridObj[coordinates.x][coordinates.y] = true;
      field.classList.add('clicked-field');
      console.log(thisFinder.gridObj);
    }

    //thisFinder.possibleToClick(coordinates)
  }

  /* possibleToClick(coordinates) {
    const thisFinder = this;

    console.log(coordinates.x)

    if (thisFinder.gridObj[coordinates.x][coordinates.y] == true) {

      if (coordinates.x > 1) {
        const possibleClicked = document.querySelector('[data-x="' + (parseInt(coordinates.x) - 1) + '"][data-y="' + coordinates.y + '"]');
        possibleClicked.classList.add('possible-to-click')
      }
      if (coordinates.x < 10) {
        const possibleClicked = document.querySelector('[data-x="' + (parseInt(coordinates.x) + 1) + '"][data-y="' + coordinates.y + '"]');
        possibleClicked.classList.add('possible-to-click')
      }
      if (coordinates.y > 1) {
        const possibleClicked = document.querySelector('[data-x="' + coordinates.x + '"][data-y="' + (parseInt(coordinates.y) - 1) + '"]');
        possibleClicked.classList.add('possible-to-click')
      }
      if (coordinates.y < 10) {
        const possibleClicked = document.querySelector('[data-x="' + coordinates.x + '"][data-y="' + (parseInt(coordinates.y) + 1) + '"]');
        possibleClicked.classList.add('possible-to-click')
      }
    }

    if (thisFinder.gridObj[coordinates.x][coordinates.y] == false) {

      if (coordinates.x > 1) {
        const possibleClicked = document.querySelector('[data-x="' + (parseInt(coordinates.x) + 1) + '"][data-y="' + coordinates.y + '"]');
        possibleClicked.classList.remove('possible-to-click')
      }
      if (coordinates.x < 10) {
        const possibleClicked = document.querySelector('[data-x="' + (parseInt(coordinates.x) - 1) + '"][data-y="' + coordinates.y + '"]');
        possibleClicked.classList.remove('possible-to-click')
      }
      if (coordinates.y > 1) {
        const possibleClicked = document.querySelector('[data-x="' + coordinates.x + '"][data-y="' + (parseInt(coordinates.y) - 1) + '"]');
        possibleClicked.classList.remove('possible-to-click')
      }
      if (coordinates.y < 10) {
        const possibleClicked = document.querySelector('[data-x="' + coordinates.x + '"][data-y="' + (parseInt(coordinates.y) + 1) + '"]');
        possibleClicked.classList.remove('possible-to-click')
      }
    }
  } */
}
export default Finder;