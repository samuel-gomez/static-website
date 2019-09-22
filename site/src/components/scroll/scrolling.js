import { prefix, prefixjs } from '@wooweb/core/config.json';
import $ from '../../commons/js/selector';

const classHeader = `${prefixjs}-header`;
const classHeaderScrolling = `${prefix}-header--scrolling`;

class Scrolling {
  constructor() {
    this.header = $(classHeader);
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    this.scrolling();
    this.initEvents();
  }

  initEvents() {
    window.addEventListener('scroll', () => this.scrolling(), true);
  }

  scrolling() {
    if (document.body.getBoundingClientRect().top === 0) {
      this.header.classList.remove(classHeaderScrolling);
      return;
    }
    this.header.classList.add(classHeaderScrolling);
  }

  isNotExitingElement() {
    return !this.header;
  }
}

export default Scrolling;
