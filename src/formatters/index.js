import renderStylish from './stylish.js';
import renderPlain from './plain.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return renderStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    case 'plain':
      return renderPlain(tree);
    default:
      throw new Error(`Unknown format: ${format}!`);
  }
};
