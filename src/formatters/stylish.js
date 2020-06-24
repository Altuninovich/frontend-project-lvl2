const tab = (x) => ' '.repeat(x);
const getFormatStylish = (tree) => {
  const iter = (arr, depth = 0) => {
    const stringify = (value, depthSpaces) => {
      if (typeof(value) !== 'object') {
        return value;
      }
      const keys = Object.keys(value);
      const result = keys.map((key) => (`{\n${tab(depthSpaces + 2)}${key}: ${stringify(value[key])}\n${tab(depthSpaces + 1)}}`));
      return result;
    };
    const result = arr.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return `${tab(depth + 1)}${node.key}: {\n${iter(node.children, depth + 1)}\n${tab(depth + 1)}}`;
        case 'added':
          return `  ${tab(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `  ${tab(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return [
            `  ${tab(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
            `  ${tab(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`
                  ];
        case 'unchanged':
          return `    ${tab(depth)}${node.key}: ${stringify(node.value, depth)}`;
        default:
          throw new Error(`Unknown status! "${node.type}" wrong!`);                                              
      }
  });
    return result.join('\n');
  };
  return iter(tree);
};

export default getFormatStylish;
