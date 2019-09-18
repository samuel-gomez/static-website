import Menu from './components/menu/menu';
import Tabs from './components/tabs/tabs';
import Demo from './components/demo/demo';
import Smoke from './components/smoke/smoke';
import Ray from './components/smoke/ray';
import Technos from './components/technos/index';

const menu = new Menu();
const tabs = new Tabs('js-tabs');
const tabsDemo = new Tabs('js-tabs--demo');
const demo = new Demo();
const smoke = new Smoke();
const ray = new Ray();
const technos = new Technos();

document.addEventListener('DOMContentLoaded', () => {
  smoke.init();
  ray.init();
  menu.init();
  tabs.init();
  tabsDemo.init();
  demo.init();
  technos.init();
});
