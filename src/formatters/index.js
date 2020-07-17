import renderStylish from './stylish.js';
import renderPlain from './plain.js';

const format = (tree, fileFormat) => {
  switch (fileFormat) {
    case 'stylish':
      return renderStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    case 'plain':
      return renderPlain(tree);
    default:
      throw new Error(`Unknown format: ${fileFormat}!`);
  }
};

export default format;
