import { classNames, select } from './settings.js';
import About from './components/About.js';
import Finder from './components/Finder.js';


const app = {
  initAbout: function () {
    const thisApp = this;

    thisApp.aboutContainer = document.querySelector(select.containerOf.about);

    thisApp.about = new About(thisApp.aboutContainer);
  },

  initFinder: function () {
    const thisApp = this;

    thisApp.finderContainer = document.querySelector(select.containerOf.finder);

    thisApp.finder = new Finder(thisApp.finderContainer);
  },

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.menuLinks = document.querySelectorAll(select.menu.links);
    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.menuLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.menuLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }

  },

  init: function () {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initAbout();
    thisApp.initFinder();

  }
};

app.init();