import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePathFlat = (filename) => path.join(__dirname, '..', '__fixtures__', 'flat', filename);
const getFixturePathNested = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename);
const formats = ['json', 'yml', 'ini'];
const formatsNested = ['json', 'yml', 'ini'];
let expected;
let expectedNestedStylish;
let expectedNestedPlain;

beforeAll(() => {
  expected = fs.readFileSync(getFixturePathFlat('result.diff'), 'utf-8');
  expectedNestedStylish = fs.readFileSync(getFixturePathNested('result-stylish.diff'), 'utf-8');
  expectedNestedPlain = fs.readFileSync(getFixturePathNested('result-plain.diff'), 'utf-8');
});

test.each(formats)('compare two %s files', (format) => {
  const before = getFixturePathFlat(`before.${format}`);
  const after = getFixturePathFlat(`after.${format}`);
  expect(genDiff(before, after)).toString(expected);
});
test.each(formatsNested)('compare two %s files', (format) => {
  const before = getFixturePathNested(`before.${format}`);
  const after = getFixturePathNested(`after.${format}`);
  expect(genDiff(before, after)).toString(expectedNestedStylish);
});
test.each(formatsNested)('compare two %s files', (format) => {
  const before = getFixturePathNested(`before.${format}`);
  const after = getFixturePathNested(`after.${format}`);
  expect(genDiff(before, after, 'plain')).toString(expectedNestedPlain);
});
