import { /*settings,*/ templates, /*select*/ } from '../settings.js';

class Finder {
  constructor(element) {
    const thisFinder = this;

    thisFinder.step = 1;
    thisFinder.element = element;

    thisFinder.gridObj = {};
    for (let x = 1; x <= 10; x++) {
      thisFinder.gridObj[x] = {};
      for (let y = 1; y <= 10; y++) {
        thisFinder.gridObj[x][y] = false;
      }

    }

    thisFinder.startEndPoints = {
      start: null,
      end: null,
    };

    thisFinder.render();

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

    for (let x in thisFinder.gridObj) {
      for (let y in thisFinder.gridObj[x]) {
        if (thisFinder.gridObj[x][y]) {
          const clickedfield = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
          clickedfield.classList.add('clicked-field');
        }
      }
    }

    /* for (let point in thisFinder.startEndPoints) {
      for (let axis in thisFinder.startEndPoints[point]) {
        console.log(thisFinder.startEndPoints[point]);
      }
      console.log(thisFinder.startEndPoints[point]);
      //const startEndField = document.querySelector('[data-x="' + thisFinder.startEndPoints[point].x + '"][data-y="' + thisFinder.startEndPoints[point].y + '"]');
      //startEndField.classList.add('start-end');
    } */
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

    if (thisFinder.step === 2) {
      thisFinder.element.querySelector('.finder-button').addEventListener('click', function (event) {
        event.preventDefault();
        if (thisFinder.startEndPoints.start != null && thisFinder.startEndPoints.end != null) {
          thisFinder.changeStep(3);
        } else {
          alert('Please choose start and end point');
        }
      });

      thisFinder.element.querySelector('.finder-grid').addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.classList.contains('field')) {
          if (event.target.classList.contains('clicked-field')) {
            thisFinder.stepTwo(event.target);
          } else {
            alert('You have to choose start and end point from previously selected fields');
          }
        }
      });
    }

    if (thisFinder.step === 3) {
      thisFinder.element.querySelector('.finder-button').addEventListener('click', function (event) {
        event.preventDefault();
        thisFinder.startEndPoints = {
          start: null,
          end: null,
        };
        thisFinder.changeStep(1);
        for (let x in thisFinder.gridObj) {
          for (let y in thisFinder.gridObj[x]) {
            if (thisFinder.gridObj[x][y]) {
              const clickedfield = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
              clickedfield.classList.remove('clicked-field');
              thisFinder.gridObj[x][y] = false;
            }
          }
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

  stepTwo(field) {
    const thisFinder = this;



    const coordinates = {
      x: field.getAttribute('data-x'),
      y: field.getAttribute('data-y')
    };

    console.log(thisFinder.startEndPoints);

    if (thisFinder.startEndPoints.start === null) {
      if (thisFinder.startEndPoints.end === null) {
        field.classList.add('start-end');
        thisFinder.startEndPoints.start = coordinates;
      } else {
        if (field.classList.contains('start-end')) {
          field.classList.remove('start-end');
          thisFinder.startEndPoints.end = null;
        } else {
          field.classList.add('start-end');
          thisFinder.startEndPoints.start = coordinates;
        }
      }
    } else {
      if (thisFinder.startEndPoints.end === null) {
        if (field.classList.contains('start-end')) {
          field.classList.remove('start-end');
          thisFinder.startEndPoints.start = null;
        } else {
          field.classList.add('start-end');
          thisFinder.startEndPoints.end = coordinates;
        }
      } else {
        if (field.classList.contains('start-end')) {
          field.classList.remove('start-end');
          console.log(coordinates);
          console.log(thisFinder.startEndPoints.start);
          if ((thisFinder.startEndPoints.start.x == coordinates.x) && (thisFinder.startEndPoints.start.y == coordinates.y)) {
            thisFinder.startEndPoints.start = null;
          } else {
            thisFinder.startEndPoints.end = null;
          }
        } else {
          alert('You have already choosen start and end point. Please click the button to check the fastest route');
        }


      }

    }

    console.log(thisFinder.startEndPoints);

  }

  //thisFinder.startEndPoints.start = coordinates;
  //console.log(thisFinder.startEndPoints)


  //}

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
  //}
}
export default Finder;