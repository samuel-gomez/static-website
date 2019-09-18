/* eslint-disable arrow-parens */
import { prefixjs, prefix } from '@wooweb/core/config.json';
import $ from '../../commons/js/selector';
import $$ from '../../commons/js/selectorAll';

const classTechno = `${prefixjs}-technos__icon`;
const classTechnoActive = `${prefix}-technos__icon--active`;
const classDesc = `${prefixjs}-technos-article`;
const classDescActive = `${prefix}-technos-article--active`;

const setActive = e => {
  const id = e.currentTarget.getAttribute('data-id');
  const oldActiveDesc = $(classDescActive);
  const oldActive = $(classTechnoActive);
  if (oldActiveDesc) {
    oldActive.classList.remove(classTechnoActive);
    oldActiveDesc.classList.remove(classDescActive);
  }
  const newActiveDesc = $(`${classDesc}--${id}`);
  e.currentTarget.classList.add(classTechnoActive);
  newActiveDesc.classList.add(classDescActive);
};

class Technos {
  constructor() {
    this.technos = $$(document)(`.${classTechno}`);
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    this.initEvents();
  }

  initEvents() {
    [].forEach.call(this.technos, elt => elt.addEventListener('click', setActive, true));
  }

  isNotExitingElement() {
    return !this.technos;
  }
}
export default Technos;
