import parsers from './parsers.js';
import formatters from './formatters/index.js';

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const dataBefore = parsers(pathToFile1);
  const dataAfter = parsers(pathToFile2);
  const getTreeDifferenceСhangesObjects = (objFileBefore, objFileAfter) => {
    const arrUniqueKey = Object.keys({ ...objFileBefore, ...objFileAfter });
    const resObj = arrUniqueKey.reduce((acc, nameKey) => {
      const valueBefore = objFileBefore[nameKey];
      const valueAfter = objFileAfter[nameKey];
      if (valueBefore && valueAfter) {
        if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
          return [...acc, { key: nameKey, type: 'nested', children: getTreeDifferenceСhangesObjects(valueBefore, valueAfter) }];
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
  const tree = getTreeDifferenceСhangesObjects(dataBefore, dataAfter);
  return formatters(tree, format);
};
export default genDiff;
