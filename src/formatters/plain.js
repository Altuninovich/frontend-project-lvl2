const getFormatPlain = (obj1, obj2) => {
  const checkValue = (value) => (typeof (value) === 'object' ? '[complex value]' : value);
  const iter = (objFileBefore, objFileAfter, acc) => {
    const arrUniqueKey = Object.keys({ ...objFileBefore, ...objFileAfter });
    const result = arrUniqueKey.flatMap((key) => {
      const valueBefore = objFileBefore[key];
      const valueAfter = objFileAfter[key];
      if (valueBefore && valueAfter) {
        if (typeof (valueBefore) === 'object' && typeof (valueAfter) === 'object') {
          return iter(valueBefore, valueAfter, `${acc}${key}.`);
        }
        if (valueBefore === valueAfter) {
          return undefined;
        }
        return `Property "${acc}${key}." was changed from "${checkValue(valueBefore)}" to "${checkValue(valueAfter)}"`;
      }
      if (valueBefore) {
        return `Property "${acc}${key}." was deleted`;
      }
      return `Property "${acc}${key}." was added with value: "${checkValue(valueAfter)}"`;
    }).filter((el) => el).join('\n');
    return result;
  };
  return iter(obj1, obj2, '');
};

export default getFormatPlain;
