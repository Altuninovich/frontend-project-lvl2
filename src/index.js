import path from 'path';
import fs from 'fs';
import { trim } from 'lodash';
import parse from './parsers.js';
import formatters from './formatters/index.js';
import buildTree from './tree.js';

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const dataFile1 = fs.readFileSync(pathToFile1, 'utf-8');
  const dataFile2 = fs.readFileSync(pathToFile2, 'utf-8');
  const dataBefore = parse(dataFile1, trim(path.extname(pathToFile1), '.'));
  const dataAfter = parse(dataFile2, trim(path.extname(pathToFile2), '.'));
  const tree = buildTree(dataBefore, dataAfter);
  return formatters(tree, format);
};
export default genDiff;
