import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => (`{\n${indent(depth + 2)}${key}: ${stringify(value[key])}\n${indent(depth + 1)}}`));
  return result;
};

const renderStylish = (tree) => {
  const iter = (subtree, depth = 0) => {
    const result = subtree.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent(depth + 1)}${node.key}: {\n${iter(node.children, depth + 1)}\n${indent(depth + 1)}}`;
        case 'added':
          return `  ${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `  ${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return [
            `  ${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
            `  ${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
          ];
        case 'unchanged':
          return `    ${indent(depth)}${node.key}: ${stringify(node.value, depth)}`;
        default:
          throw new Error(`Unknown status! "${node.type}" wrong!`);
      }
    });
    return result.join('\n');
  };
  return iter(tree);
};

export default (tree) => `{\n${renderStylish(tree)}\n}`;
