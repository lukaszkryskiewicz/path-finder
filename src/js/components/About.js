import { /*settings,*/ templates, /*select*/ } from '../settings.js';

class About {
  constructor(element) {
    const thisAbout = this;

    thisAbout.render(element);
    // eslint-disable-next-line no-undef
    AOS.init({
      duration: 2500,
    });

  }

  render(element) {
    const thisAbout = this;

    const generatedHTML = templates.about();

    thisAbout.dom = {};
    thisAbout.dom.wrapper = element;
    thisAbout.dom.wrapper.innerHTML = generatedHTML;
  }
}

export default About;