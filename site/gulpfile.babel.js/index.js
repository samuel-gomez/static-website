import { series } from 'gulp';
import clean from './clean';
import jsDev, { jsProd } from './js';
import sassDev, { sassBuild } from './sass';
import pug from './pug';
import images from './images';
import sprite from './sprite';
import serve from './serve';

const build = series(clean, jsProd, sassBuild, images, sprite, pug);
const dev = series(clean, jsDev, sassDev, images, sprite, pug, serve);

export default build;
export { dev, build, clean, jsDev, jsProd, sassBuild, sassDev, pug, images, sprite };
