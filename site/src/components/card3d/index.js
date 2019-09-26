import { prefixjs } from '@wooweb/core/config.json';
import VanillaTilt from 'vanilla-tilt';
import $$ from '../../commons/js/selectorAll';

const classCard3d = `${prefixjs}-card3d`;

class Card3d {
  constructor(selector) {
    this.cards = $$(document)(`.${selector !== '' ? selector : classCard3d}`);
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    this.initTilt();
  }

  initTilt() {
    VanillaTilt.init(this.cards, {
      glare: true,
      scale: 1.1,
    });
  }

  isNotExitingElement() {
    return !this.cards;
  }
}

export default Card3d;
