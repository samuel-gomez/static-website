/* eslint-disable arrow-parens */
import { src, dest } from 'gulp';
import pugg from 'pug';
import pretty from 'pretty';
import { join } from 'path';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import { lstatSync, readdirSync, readFileSync } from 'fs';
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

const getFileData = fileName => JSON.parse(readFileSync(`${baseData}${fileName}.json`));

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).filter(
    folder => isDirectory(join(source, folder)) && folder !== 'partials' && folder !== 'home',
  );

const getData = (lang, folders, sub = '') => {
  const articles = [];
  folders.forEach(folder => {
    const article = require(`../src/pages/${lang}${sub}/${folder}/data.json`);
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
  const pages = [];
  languages.forEach(lang => {
    const foldersBlog = getDirectories(`src/pages/${lang}/blog`);
    articles[lang] = getData(lang, foldersBlog, '/blog');
    const foldersPage = getDirectories(`src/pages/${lang}`);
    pages[lang] = getData(lang, foldersPage);
  });

  const data = {
    base,
    general,
    menu,
    basedir,
    functions: { setClass, setClassActive, pugg, pretty },
    require,
    articles,
    pages,
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
