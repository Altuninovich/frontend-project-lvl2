import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './treeBuilder.js';

const getFormat = (filepath) => _.trim(path.extname(filepath), '.');
const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), getFormat(filepath));

const genDiff = (filepath1, filepath2, dataFormat = 'stylish') => {
  const dataBefore = getData(getFullPath(filepath1));
  const dataAfter = getData(getFullPath(filepath2));
  const tree = buildTree(dataBefore, dataAfter);
  return format(tree, dataFormat);
};
export default genDiff;
