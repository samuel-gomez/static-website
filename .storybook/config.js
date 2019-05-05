import 'babel-polyfill';
import { configure, addDecorator, setAddon } from '@storybook/react';

import infoAddon from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';

import './storybook.scss';

setOptions({
  name: 'LERNA & CRA',
  url: 'https://www.samuelgomez.fr',
  hierarchySeparator: /\./,
  hierarchyRootSeparator: /\|/
});

/* const reqPkg = require.context('../packages', true, /\**.stories.js$/);
const reqApp = require.context('../app/src', true, /\**.stories\.js$/);
var reqs = [];

reqPkg.keys().forEach(filename => reqs.push(reqPkg(filename)));
reqApp.keys().forEach(filename => reqs.push(reqApp(filename)));
 */

const req = require.context('../app/src', true, /\**.stories.js$/);

function loadStories() {
  require('../packages/sg-header/src/Header.stories');
  require('../packages/sg-title/src/Title.stories');

  req.keys().forEach(filename => req(filename));
  //reqs.forEach(req => req);
}

addDecorator(withKnobs);
setAddon(infoAddon);

configure(loadStories, module);
