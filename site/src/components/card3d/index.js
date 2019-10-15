import { prefixjs } from '@wooweb/core/config.json';
import VanillaTilt from 'vanilla-tilt';
import $$ from '../../commons/js/selectorAll';

const classCard3d = `${prefixjs}-card3d`;
const defaultOptions = {
  reverse: false,
  max: 5,
  startX: 0,
  startY: 0,
  perspective: 1000,
  scale: 1.1,
  speed: 300,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
  glare: false,
  'max-glare': 0.2,
  'glare-prerender': false,
  'mouse-event-element': null,
};

class Card3d {
  constructor(selector, customOptions) {
    this.cards = $$(document)(`.${selector !== '' ? selector : classCard3d}`);
    this.options = { ...defaultOptions, ...customOptions };
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    this.initTilt();
  }

  initTilt() {
    VanillaTilt.init(this.cards, this.options);
  }

  isNotExitingElement() {
    return !this.cards;
  }
}

export default Card3d;
