import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';

const getData = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');
const getFormat = (pathToFile) => _.trim(path.extname(pathToFile), '.');
const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const genDiff = (pathToFile1, pathToFile2, dataFormat = 'stylish') => {
  const fullPath1 = getFullPath(pathToFile1);
  const fullPath2 = getFullPath(pathToFile2);
  const dataFile1 = getData(fullPath1);
  const dataFile2 = getData(fullPath2);
  const formatFile1 = getFormat(pathToFile1);
  const formatFile2 = getFormat(pathToFile2);
  const dataBefore = parse(dataFile1, formatFile1);
  const dataAfter = parse(dataFile2, formatFile2);
  const tree = buildTree(dataBefore, dataAfter);
  return format(tree, dataFormat);
};
export default genDiff;
