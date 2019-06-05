/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable arrow-parens */
// eslint-disable-next-line import/no-extraneous-dependencies
import { orderBy } from 'lodash';
import pug from 'pug';
import pretty from 'pretty';
import { join } from 'path';
import { lstatSync, readdirSync, readFileSync } from 'fs';
import configCore from '@wooweb/core/config.json';
import setClass from '../src/commons/js/setClass';
import setClassActive from '../src/commons/js/setClassActive';

const basedir = './';
const baseData = './src/data/';

const getFileData = fileName => JSON.parse(readFileSync(`${baseData}${fileName}.json`));

const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = source =>
  readdirSync(source).filter(
    folder => isDirectory(join(source, folder)) && folder !== 'partials' && folder !== 'home',
  );

const getArticle = (path, folder = '') => {
  const article = require(path);
  article.link = `./${folder}`;
  article.id = folder;
  return article;
};

const getDataArticles = (lang, folders, sub = '') => {
  const articles = [];
  folders.forEach(folder => {
    const article = getArticle(`../src/pages/${lang}${sub}/${folder}/data.json`, folder);
    articles.push(article);
  });
  const orderedArticles = orderBy(articles, ['modified'], ['asc']);
  return orderedArticles;
};

const getData = languages => {
  const base = { ...configCore, ...getFileData('base') };
  const general = getFileData('general');
  const menu = getFileData('menu');
  const articles = [];
  const pages = [];

  languages.forEach(lang => {
    const foldersBlog = getDirectories(`src/pages/${lang}/blog`); // get folders on '/blog' directory
    articles[lang] = getDataArticles(lang, foldersBlog, '/blog'); // Loop on blog folders to get their data
    const foldersPage = getDirectories(`src/pages/${lang}`); // get folders '/pages' directory (not children)
    pages[lang] = getDataArticles(lang, foldersPage); // Loop on page folders to get their data
    const homePage = getArticle(`../src/pages/${lang}/data.json`); // get home page data
    pages[lang].push(homePage);
  });

  return {
    base,
    general,
    menu,
    basedir,
    functions: { setClass, setClassActive, pug, pretty },
    require,
    articles,
    pages,
  };
};

export default getData;
