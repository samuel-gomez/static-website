/* eslint-disable no-undef */
import {
  Object3D,
  MeshPhysicalMaterial,
  DoubleSide,
  CircleGeometry,
  Mesh,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  SpotLight,
  PointLight,
  RectAreaLight,
  PCFSoftShadowMap,
} from 'three';
import { prefixjs } from '@wooweb/core/config.json';
import $ from '../../commons/js/selector';

const classRay = `${prefixjs}-ray`;

const mathRandom = (num = 1) => -Math.random() * num + Math.random() * num;

const generateParticle = (num, amp = 2) => {
  const particularGroup = new Object3D();
  const gmaterial = new MeshPhysicalMaterial({
    color: 0xffffff,
    side: DoubleSide,
  });

  const gparticular = new CircleGeometry(0.2, 5);

  for (let i = 1; i < num; i += 1) {
    const pscale = 0.001 + Math.abs(mathRandom(0.03));
    const particular = new Mesh(gparticular, gmaterial);

    particular.position.set(mathRandom(amp), mathRandom(amp), mathRandom(amp));
    particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
    particular.scale.set(pscale, pscale, pscale);
    particular.speedValue = mathRandom(1);

    particularGroup.add(particular);
  }
  return particularGroup;
};

class Ray {
  constructor() {
    this.ray = $(classRay);
  }

  init() {
    if (this.isNotExitingElement()) {
      return;
    }
    this.initRay();
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  initRay() {
    this.initRayScene();
    this.initRayCamera();
    this.setParticules();
    this.setSceneRay();
    this.appendRayScene();
  }

  initRayScene() {
    this.rendererR = new WebGLRenderer({ antialias: true, alpha: true });
    this.rendererR.setSize(window.innerWidth, window.innerHeight);
    this.rendererR.setClearColor(0x000000, 0);
    this.rendererR.shadowMap.enabled = false;
    this.rendererR.shadowMap.type = PCFSoftShadowMap;
    this.rendererR.shadowMap.needsUpdate = true;
    this.sceneR = new Scene();
  }

  initRayCamera() {
    this.cameraR = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
    this.cameraR.position.set(0, 0, 3);
    this.sceneR.add(this.cameraR);
  }

  setParticules() {
    const sceneGroup = new Object3D();
    this.particularGroup = generateParticle(100, 2);
    sceneGroup.add(this.particularGroup);
    this.sceneR.add(sceneGroup);
  }

  setSceneRay() {
    const ambientLight = new AmbientLight(0xffffff, 0.1);
    this.sceneR.add(ambientLight);

    const light = new SpotLight(0xffffff, 3);
    light.position.set(5, 5, 2);
    light.castShadow = true;
    light.shadow.mapSize.width = 10000;
    light.shadow.mapSize.height = light.shadow.mapSize.width;
    light.penumbra = 0.5;

    const lightBack = new PointLight(0x0fffff, 1);
    lightBack.position.set(0, -3, -1);

    this.sceneR.add(light);
    this.sceneR.add(lightBack);

    const rectSize = 2;
    const intensity = 100;
    const rectLight = new RectAreaLight(0x0fffff, intensity, rectSize, rectSize);
    rectLight.position.set(0, 0, 1);
    rectLight.lookAt(0, 0, 0);
    this.sceneR.add(rectLight);
  }

  appendRayScene() {
    this.ray.appendChild(this.rendererR.domElement);
  }

  render() {
    this.cameraR.lookAt(this.sceneR.position);
    this.rendererR.render(this.sceneR, this.cameraR);
  }

  animateRay() {
    for (let i = 0, l = this.particularGroup.children.length; i < l; i += 1) {
      const newObject = this.particularGroup.children[i];
      newObject.rotation.x += newObject.speedValue / 10;
      newObject.rotation.y += newObject.speedValue / 10;
      newObject.rotation.z += newObject.speedValue / 10;
    }
    this.particularGroup.rotation.y += 0.005;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.animateRay();
    this.render();
  }

  onWindowResize() {
    this.cameraR.aspect = window.innerWidth / window.innerHeight;
    this.cameraR.updateProjectionMatrix();
    this.rendererR.setSize(window.innerWidth, window.innerHeight);
  }

  isNotExitingElement() {
    return !this.ray;
  }
}

export default Ray;
