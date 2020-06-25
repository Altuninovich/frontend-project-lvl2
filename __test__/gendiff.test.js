import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getDataFile = (format) => fs.readFileSync(getPath(`${format}.diff`), 'utf-8');
let stylish;
let plain;
let json;
beforeAll(() => {
  stylish = getDataFile('stylish');
  plain = getDataFile('plain');
  json = getDataFile('json');
});

test('stylish', () => {
  const before = getPath('before.ini');
  const after = getPath('after.ini');
  expect(genDiff(before, after)).toString(stylish);
});
test('plain', () => {
  const before = getPath('before.json');
  const after = getPath('after.json');
  expect(genDiff(before, after, 'plain')).toString(plain);
});
test('json', () => {
  const before = getPath('before.yml');
  const after = getPath('after.yml');
  expect(genDiff(before, after, 'json')).toString(json);
});
