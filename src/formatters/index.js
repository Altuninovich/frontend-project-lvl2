import stylish from './stylish.js';
import json from './json.js';
import plain from './plain.js';

const formatSelection = (obj1, obj2, format) => {
  switch (format) {
    case 'stylish':
      return stylish(obj1, obj2);
    case 'json':
      return json(obj1, obj2);
    case 'plain':
      return plain(obj1, obj2);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default formatSelection;
