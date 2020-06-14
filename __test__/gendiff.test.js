import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const filetypesEndFormats = [['ini', 'stylish'],
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['ini', 'plain'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'json'],
  ['json', 'json'],
  ['yml', 'json']];

test.each(filetypesEndFormats)('%s type files difference with %s output', (filetype, format) => {
  const before = getPath(`before.${filetype}`);
  const after = getPath(`after.${filetype}`);
  const output = fs.readFileSync(getPath(`${format}.diff`), 'utf-8');
  expect(genDiff(before, after, format)).toString(output);
});
