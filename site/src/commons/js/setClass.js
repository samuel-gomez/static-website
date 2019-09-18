import { isEmpty } from 'lodash';
import { prefix, prefixjs } from '@wooweb/core/config.json';

import setModifier from './setModifier';

const setClassModifier = base => modifiers =>
  ` ${modifiers.map(modifier => `${setModifier(`${base}`, modifier)}`).join(' ')}`;

export default (block, modifier, js = false) => {
  const modifiers = modifier.split(' ');
  let classComponent = `${prefix}-${block}`;

  if (!isEmpty(modifiers)) {
    classComponent += setClassModifier(classComponent)(modifiers);
  }

  if (js) {
    let classJsComponent = `${prefixjs}-${block}`;
    if (!isEmpty(modifiers)) {
      classJsComponent += setClassModifier(classJsComponent)(modifiers);
    }
    classComponent += ` ${classJsComponent}`;
  }

  return classComponent;
};
