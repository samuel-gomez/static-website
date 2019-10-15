/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
import { prefix, prefixjs, pathImg } from '@wooweb/core/config.json';
import $ from '../../commons/js/selector';
import $$ from '../../commons/js/selectorAll';

const classCloud = `${prefixjs}-cloud`;
const basePath = `${window.location.protocol}//${window.location.host}`;
const bubblesClass = `${prefixjs}-home__bubbles`;
const bubbleClass = `${prefixjs}-bubble-outer`;
const bubbleClassActive = `${prefix}-bubble-outer--active`;
const bubbleClassInactive = `${prefix}-bubble-outer--inactive`;
const siteClass = `${prefixjs}-body`;
const bubbleContainerClassActive = `${prefix}-home__bubbles--active`;
const closeBubbleClass = `${prefixjs}-icon--closeBubble`;
const image = `${basePath}/${pathImg}/Smoke-Element.png`;

const enumBgColors = {
  default: ['#dddddd', '#333333'],
  green: ['#008888', '#001111'],
  red: ['#8c013c', '#280a0f'],
  uxdesign: ['#9726b8', '#FF9359'],
  development: ['#0078ba', '#000059'],
  opensource: ['#8c013c', '#280a0f'],
};

const hexToRgba = (hex, opacity) => {
  const code = hex.substring(1, hex.length);
  const red = parseInt(code.substring(0, 2), 16);
  const green = parseInt(code.substring(2, 4), 16);
  const blue = parseInt(code.substring(4, 6), 16);
  return `rgba(${red},${green},${blue}, ${opacity})`;
};

class Cloud {
  constructor() {
    this.clouds = $$(document)(`.${classCloud}`);
    this.bubbles = $$(document)(`.${bubbleClass}`);
    this.site = $(siteClass);
    this.bubbleContainer = $(bubblesClass);
    this.closeBubble = $(closeBubbleClass);
    this.setActive = this.setActive.bind(this);
    this.clearActive = this.clearActive.bind(this);
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }

    this.initEvents();
    this.initCloud({ color: enumBgColors.default[0], colorDarker: enumBgColors.default[1] });
  }

  initEvents() {
    if (this.bubbles.length) {
      this.initEventsBubble(this.bubbles);
    }

    if (this.closeBubble) {
      this.initEventCloseBubble();
    }
  }

  initEventCloseBubble() {
    this.closeBubble.addEventListener('click', this.clearActive, true);
  }

  initEventsBubble(elts) {
    [].forEach.call(elts, elt => elt.addEventListener('click', this.setActive, true));
  }

  setActive(evt) {
    const id = evt.currentTarget.getAttribute('id');
    this.site.className = `${prefix}-body ${prefixjs}-body sg-body--${id}`;
    this.bubbleContainer.classList.add(bubbleContainerClassActive);
    [].forEach.call(this.bubbles, elt => {
      if (elt.getAttribute('id') === id) {
        elt.classList.add(bubbleClassInactive);
        elt.removeEventListener('click', this.setActive, true);
        elt.classList.remove(bubbleClassInactive);
        elt.classList.add(bubbleClassActive);
        elt.addEventListener('click', this.clearActive, true);
      } else {
        elt.classList.add(bubbleClassInactive);
      }
    });
    this.initCloud({ color: enumBgColors[id][0], colorDarker: enumBgColors[id][1] });
  }

  clearActive() {
    this.bubbleContainer.classList.remove(bubbleContainerClassActive);
    this.site.className = `${prefix}-body ${prefixjs}-body`;
    [].forEach.call(this.bubbles, elt => {
      elt.classList.remove(bubbleClassActive);
      elt.classList.remove(bubbleClassInactive);
      elt.addEventListener('click', this.setActive, true);
    });
  }

  initCloud({ color, colorDarker }) {
    [].forEach.call(this.clouds, elt => {
      const ctx = elt.getContext('2d');
      const img = new Image();
      img.src = image;
      img.width = elt.width;
      img.height = elt.height;
      img.onload = function onLoad() {
        ctx.drawImage(this, 0, 0);
        ctx.globalCompositeOperation = 'source-in';
        const opacity = Math.random() - 0.2;
        const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 150);
        const colorRgba = hexToRgba(color, opacity);
        const colorDarkerRgba = hexToRgba(colorDarker, opacity);
        gradient.addColorStop(0, colorRgba);
        gradient.addColorStop(1, colorDarkerRgba);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
      };
    });
  }

  isNotExitingElement() {
    return !this.clouds;
  }
}

export default Cloud;
