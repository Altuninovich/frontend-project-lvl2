import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);

const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
let stylish;
let plain;
let json;
beforeAll(() => {
  stylish = readFixture('stylish.diff');
  plain = readFixture('plain.diff');
  json = readFixture('json.diff');
});

test('stylish', () => {
  const before = getFixturePath('before.ini');
  const after = getFixturePath('after.ini');
  expect(genDiff(before, after)).toString(stylish);
});
test('plain', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(genDiff(before, after, 'plain')).toString(plain);
});
test('json', () => {
  const before = getFixturePath('before.yml');
  const after = getFixturePath('after.yml');
  expect(genDiff(before, after, 'json')).toString(json);
});
