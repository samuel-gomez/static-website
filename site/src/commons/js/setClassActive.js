import { prefix, prefixjs } from '@wooweb/core/config.json';

export default (block, active, index) => {
  const baseClass = `${prefix}-${block}`;
  return `${
    active === index ? `${baseClass} ${baseClass}--active` : baseClass
  } ${prefixjs}-${block}`;
};
