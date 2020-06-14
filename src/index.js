import parsers from './parsers.js';
import formatters from './formatters/index.js';

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const dataBefore = parsers(pathToFile1);
  const dataAfter = parsers(pathToFile2);
  return formatters(dataBefore, dataAfter, format);
};
export default genDiff;
