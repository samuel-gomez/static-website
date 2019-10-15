/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
import {
  Clock,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  TextureLoader,
  MeshLambertMaterial,
  Mesh,
  DirectionalLight,
  AdditiveBlending,
  ImageUtils,
} from 'three';
import { prefix, prefixjs, pathImg } from '@wooweb/core/config.json';
import $ from '../../commons/js/selector';
import $$ from '../../commons/js/selectorAll';

const classSmoke = `${prefixjs}-smoke`;
const basePath = `${window.location.protocol}//${window.location.host}`;
const bubblesClass = `${prefixjs}-home__bubbles`;
const bubbleClass = `${prefixjs}-bubble-outer`;
const bubbleClassActive = `${prefix}-bubble-outer--active`;
const bubbleClassInactive = `${prefix}-bubble-outer--inactive`;
const siteClass = `${prefixjs}-body`;
const bubbleContainerClassActive = `${prefix}-home__bubbles--active`;
const closeBubbleClass = `${prefixjs}-icon--closeBubble`;

const enumBgColors = {
  default: ['#9726b8', '#FF9359'],
  uxdesign: ['#9726b8', '#FF9359'],
  development: ['#0078ba', '#000059'],
  opensource: ['#c62615', '#FF00FF'],
};

class Smoke {
  constructor() {
    this.smoke = $(classSmoke);
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
    this.initSmoke({ color: 0x00ffff, colorLight: 0x00ffff });
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
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
    const colorStr = enumBgColors[id][0];
    const color = parseInt(colorStr.replace(/^#/, ''), 16);
    const colorStrLight = enumBgColors[id][1];
    const colorLight = parseInt(colorStrLight.replace(/^#/, ''), 16);
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
    this.initSmoke({ color, colorLight });
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

  initSmoke({ color, colorLight }) {
    this.initSmokeScene();
    this.initCamera();
    this.addText();
    this.addLight({});
    this.addLight({ color: colorLight });
    this.setSmoke({ color });
  }

  initSmokeScene() {
    this.clock = new Clock();
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0.5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene = new Scene();
  }

  initCamera() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;
    this.scene.add(this.camera);
  }

  addText() {
    const textGeo = new PlaneGeometry(400, 300);
    ImageUtils.crossOrigin = '';
    const textTexture = new TextureLoader().load(`${basePath}/${pathImg}/samuel-gomez-logo.png`);
    const textMaterial = new MeshLambertMaterial({
      color: 0xffffff,
      opacity: 0.08,
      map: textTexture,
      transparent: true,
      blending: AdditiveBlending,
    });
    const text = new Mesh(textGeo, textMaterial);
    text.position.z = 800;
    text.width = window.innerWidth;
    this.scene.add(text);
  }

  addLight({ color = 0xffffff, opacity = 0.5, x = -1, y = 0, z = 1 }) {
    const light = new DirectionalLight(color, opacity);
    light.position.set(x, y, z);
    this.scene.add(light);
  }

  setSmoke({ color }) {
    this.smokeParticles = [];
    const smokeTexture = new TextureLoader().load(`${basePath}/${pathImg}/Smoke-Element.png`);
    const smokeMaterial = new MeshLambertMaterial({
      color,
      map: smokeTexture,
      transparent: true,
    });
    const smokeGeo = new PlaneGeometry(600, 600);
    this.smokeParticles = [];

    for (let p = 0; p < 20; p += 1) {
      const particle = new Mesh(smokeGeo, smokeMaterial);
      particle.position.set(
        Math.random() * 500 - 250,
        Math.random() * 500 - 250,
        Math.random() * 1000 - 100,
      );
      particle.rotation.z = Math.random() * 360;
      this.scene.add(particle);
      this.smokeParticles.push(particle);
    }
    this.appendSmokeScene();
  }

  appendSmokeScene() {
    this.smoke.innerHTML = '';
    this.smoke.appendChild(this.renderer.domElement);
  }

  animate() {
    this.delta = this.clock.getDelta();
    requestAnimationFrame(this.animate.bind(this));
    this.evolveSmoke();
    this.render();
  }

  evolveSmoke() {
    let sp = this.smokeParticles.length;
    while (sp--) {
      this.smokeParticles[sp].rotation.z += this.delta * 0.2;
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  isNotExitingElement() {
    return !this.smoke;
  }
}

export default Smoke;
