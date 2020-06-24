const getTree = (objFileBefore, objFileAfter) => {
  const arrUniqueKey = Object.keys({ ...objFileBefore, ...objFileAfter });
  const resObj = arrUniqueKey.reduce((acc, key) => {
    const valueBefore = objFileBefore[key];
    const valueAfter = objFileAfter[key];
    if (valueBefore && valueAfter) {
      if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
        return [ ...acc, { key: key, type: 'nested', children: render(valueBefore, valueAfter) }];
      }
      if (valueBefore === valueAfter) {
        return [ ...acc, { key: key, type: 'unchanged', value: valueAfter }];
      }
      return [ ...acc, { key: key, type: 'changed', value: valueBefore, newValue: valueAfter }];
    }
    if (valueBefore) {
      return [ ...acc, { key: key, type: 'removed', value: valueBefore }];
    }
    return [ ...acc, { key: key, type: 'added', value: valueAfter }];
  }, []);
  return resObj;
};

export default getTree;
