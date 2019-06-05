/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable arrow-parens */
import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import fetch from 'node-fetch';
import { reload } from './serve';
import config from './config';
import getData from './data';

global.fetch = fetch;

const { pathSrc, pathDest } = config;

const languages = ['fr', 'en'];

const pugTsk = () => {
  const locals = getData(languages);

  return (
    src([`${pathSrc}/index.pug`, `${pathSrc}/pages/**/**/*.pug`, `!${pathSrc}/pages/**/**/_*.pug`])
      .pipe(plumber())
      //.pipe(debug())
      .pipe(
        pug({
          locals,
          //debug: true,
          //compileDebug: true,
          //pretty: true,
        }),
      )
      .pipe(dest(pathDest))
      .pipe(reload({ stream: true }))
  );
};

export default pugTsk;
