import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : value);

const renderPlain = (tree) => {
  const iter = (subtree, acc) => {
    const result = subtree.map((node) => {
      switch (node.type) {
        case 'unchanged':
          return [];
        case 'nested':
          return iter(node.children, `${acc}${node.key}.`);
        case 'added':
          return `Property '${acc}${node.key}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${acc}${node.key}' was deleted`;
        case 'changed':
          return `Property '${acc}${node.key}' was changed from '${stringify(node.value)}' to '${stringify(node.newValue)}'`;
        default:
          throw new Error(`Unknown type ${node.type} wrong!`);
      }
    });
    return result.join('\n');
  };
  return iter(tree, '');
};

export default renderPlain;
