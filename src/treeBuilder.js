import _ from 'lodash';

const buildTree = (objFileBefore, objFileAfter) => {
  const arrUniqueKey = _.union(Object.keys(objFileBefore), Object.keys(objFileAfter)).sort();
  const resultObj = arrUniqueKey.map((key) => {
    if (_.isObject(objFileBefore[key]) && _.isObject(objFileAfter[key])) {
      return {
        key,
        type: 'nested',
        children: buildTree(objFileBefore[key], objFileAfter[key]),
      };
    }
    if (_.has(objFileBefore, key) && !_.has(objFileAfter, key)) {
      return {
        key,
        type: 'removed',
        value: objFileBefore[key],
      };
    }
    if (!_.has(objFileBefore, key) && _.has(objFileAfter, key)) {
      return {
        key,
        type: 'added',
        value: objFileAfter[key],
      };
    }
    if (objFileBefore[key] !== objFileAfter[key]) {
      return {
        key,
        type: 'changed',
        value1: objFileBefore[key],
        value2: objFileAfter[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: objFileBefore[key],
    };
  });
  return resultObj;
};
export default buildTree;
