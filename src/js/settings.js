export const select = {
  templateOf: {
    about: '#template-about',
    finder: '#template-finder',
  },
  containerOf: {
    about: '.about-wrapper',
    pages: '#pages',
    finder: '.finder-wrapper',
  },
  menu: {
    links: '.menu-links a',
  },
};

export const classNames = {
  pages: {
    active: 'active',
  },

  nav: {
    active: 'active',
  },
};

export const templates = {
  about: Handlebars.compile(document.querySelector(select.templateOf.about).innerHTML),
  finder: Handlebars.compile(document.querySelector(select.templateOf.finder).innerHTML),
};