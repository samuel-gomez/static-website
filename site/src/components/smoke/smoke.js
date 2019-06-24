/* eslint-disable no-undef */
import { prefix, prefixjs, pathImg } from '@wooweb/core/config.json';
import $ from '../../commons/js/selector';
import $$ from '../../commons/js/selectorAll';

const classSmoke = `${prefixjs}-smoke`;
const basePath = `${window.location.protocol}//${window.location.host}`;
const bubblesClass = `${prefixjs}-home__bubbles`;
const bubblesClassActive = `${prefix}-bubbles--active`;
const bubbleClass = `${prefixjs}-bubble`;
const siteClass = `${prefixjs}-body`;

const enumBgColors = {
  uxdesign: '#9726b8',
  development: '#0078ba',
  opensource: '#c62615',
};

class Smoke {
  constructor() {
    this.smoke = $(classSmoke);
    this.bubbles = $$(document)(`.${bubbleClass}`);
    this.site = $(siteClass);
    this.bubbleContainer = $(bubblesClass);
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    if (this.bubbles.length) {
      this.initEvents(this.bubbles);
    }
    this.initSmoke({ color: 0x00ffff });
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  initEvents(elts) {
    [].forEach.call(elts, elt => elt.addEventListener('click', e => this.setActive(e), true));
  }

  setActive(e) {
    const id = e.currentTarget.getAttribute('id');
    const colorStr = enumBgColors[id];
    const color = parseInt(colorStr.replace(/^#/, ''), 16);
    this.site.className = `${prefix}-body ${prefixjs}-body sg-body--${id}`;
    [].forEach.call(this.bubbles, elt => {
      if (elt.getAttribute('id') === id) {
        elt.classList.add(`${prefix}-bubble--active`);
      } else {
        elt.classList.add(`${prefix}-bubble--inactive`);
      }
    });
    this.initSmoke({ color });
  }

  initSmoke({ color }) {
    this.initSmokeScene();
    this.initCamera();
    this.addText();
    this.addLight({});
    this.addLight({ color: 0xffffff });
    this.setSmoke({ color });
  }

  initSmokeScene() {
    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0.5);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;
    this.scene.add(this.camera);
  }

  addText() {
    const textGeo = new THREE.PlaneGeometry(200, 200);
    THREE.ImageUtils.crossOrigin = '';
    const textTexture = new THREE.TextureLoader().load(`${basePath}/${pathImg}/sg.png`);
    const textMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      opacity: 0.7,
      map: textTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const text = new THREE.Mesh(textGeo, textMaterial);
    text.position.z = 800;
    text.width = window.innerWidth;
    this.scene.add(text);
  }

  addLight({ color = 0xffffff, opacity = 0.5, x = -1, y = 0, z = 1 }) {
    const light = new THREE.DirectionalLight(color, opacity);
    light.position.set(x, y, z);
    this.scene.add(light);
  }

  setSmoke({ color }) {
    this.smokeParticles = [];
    const smokeTexture = new THREE.TextureLoader().load(`${basePath}/${pathImg}/Smoke-Element.png`);
    const smokeMaterial = new THREE.MeshLambertMaterial({
      color,
      map: smokeTexture,
      transparent: true,
    });
    const smokeGeo = new THREE.PlaneGeometry(300, 300);
    this.smokeParticles = [];

    for (let p = 0; p < 150; p += 1) {
      const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
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
