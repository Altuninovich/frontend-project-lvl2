const getFormatPlain = (arrTree) => {
  const checkValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);
  const iter = (tree, acc) => {
    const newTree = tree.filter((node) => node.type !== 'unchanged');
    const result = newTree.map((node) => {
      switch (node.type) {
        case 'nested':
          return iter(node.children, `${acc}${node.key}.`);
        case 'added':
          return `Property '${acc}${node.key}' was added with value: ${checkValue(node.value)}`;
        case 'removed':
          return `Property '${acc}${node.key}' was deleted`;
        case 'changed':
          return `Property '${acc}${node.key}' was changed from '${checkValue(node.value)}' to '${checkValue(node.newValue)}'`
        default:
          throw new Error (`Unknown type ${node.type} wrong!`);
        };
  });
  return result.join('\n');
}
return iter(arrTree, '');
};

export default getFormatPlain;
