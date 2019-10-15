import { src, dest } from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import { reload } from './serve';
import config from './config';
const { pathDest, pathSrc, pathSvg, svgFiles, pathSprite } = config;

const sprite = () =>
  src(`${pathSrc}${pathSvg}${svgFiles}`)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: '.',
            sprite: 'sprite.svg',
            example: true,
          },
        },
      }),
    )
    .pipe(dest(`${pathDest}${pathSprite}`))
    .pipe(reload({ stream: true }));

export default sprite;
