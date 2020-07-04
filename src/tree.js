const buildTree = (objFileBefore, objFileAfter) => {
  const arrUniqueKey = Object.keys({ ...objFileBefore, ...objFileAfter });
  const resObj = arrUniqueKey.reduce((acc, nameKey) => {
    const valueBefore = objFileBefore[nameKey];
    const valueAfter = objFileAfter[nameKey];
    if (valueBefore && valueAfter) {
      if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
        return [...acc, { key: nameKey, type: 'nested', children: buildTree(valueBefore, valueAfter) }];
      }
      if (valueBefore === valueAfter) {
        return [...acc, { key: nameKey, type: 'unchanged', value: valueAfter }];
      }
      return [...acc, {
        key: nameKey,
        type: 'changed',
        value: valueBefore,
        newValue: valueAfter,
      }];
    }
    if (valueBefore) {
      return [...acc, { key: nameKey, type: 'removed', value: valueBefore }];
    }
    return [...acc, { key: nameKey, type: 'added', value: valueAfter }];
  }, []);
  return resObj;
};
export default buildTree;
