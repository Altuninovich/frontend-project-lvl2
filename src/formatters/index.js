import stylish from './stylish.js';
import plain from './plain.js';

const formatSelection = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'json':
      return JSON.stringify(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Unknown format: ${format}!`);
  }
};

export default formatSelection;
