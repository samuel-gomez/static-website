/* eslint-disable arrow-parens */
import { src, dest } from 'gulp';
import pugg from 'pug';
import pretty from 'pretty';
import pug from 'gulp-pug';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import configCore from '@wooweb/core/config.json';
import { reload } from './serve';
import config from './config';
import setClass from '../src/commons/js/setClass';
import setClassActive from '../src/commons/js/setClassActive';

global.fetch = fetch;

const { pathSrc, pathDest } = config;

const basedir = './';
const baseData = './src/data/';

const languages = ['fr', 'en'];

const getFileData = fileName => JSON.parse(fs.readFileSync(`${baseData}${fileName}.json`));

const getFolders = lang => {
  const all = fs.readdirSync(`src/pages/${lang}/blog`);
  const folders = all.filter(
    folder =>
      folder !== 'partials' &&
      folder !== '_layout.pug' &&
      folder !== '_post.pug' &&
      folder !== 'index.pug',
  );
  const articles = [];
  folders.forEach(folder => {
    const article = require(`../src/pages/${lang}/blog/${folder}/partials/data.json`);
    article.link = `./${folder}`;
    article.id = folder;
    articles.push(article);
  });
  return articles;
};

const pugTsk = () => {
  const base = { ...configCore, ...getFileData('base') };
  const general = getFileData('general');
  const menu = getFileData('menu');
  const articles = [];
  languages.forEach(lang => {
    articles[lang] = getFolders(lang);
  });

  const data = {
    base,
    general,
    menu,
    basedir,
    functions: { setClass, setClassActive, pugg, pretty },
    require,
    articles,
    mypath: path.resolve(),
  };

  return (
    src([`${pathSrc}/index.pug`, `${pathSrc}/pages/**/**/*.pug`, `!${pathSrc}/pages/**/**/_*.pug`])
      .pipe(plumber())
      //.pipe(debug())
      .pipe(
        pug({
          locals: data,
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
