import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';

const getFixturePathFlat = (filename) => path.join(__dirname, '..', '__fixtures__', 'flat', filename);
const getFixturePathNested = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename);
//const readFile = (filename) => JSON.parse(fs.readFile(getFixturePath(filename), 'utf-8'));
const formats = ['json', 'yml', 'ini'];
const formatsNested = ['json']
let expected;
let expectedNested;

beforeAll(() => {
  expected = fs.readFileSync(getFixturePathFlat('result.diff'), 'utf-8');
  expectedNested = fs.readFileSync(getFixturePathNested('result.diff'), 'utf-8');
});

 test.each(formats)('compare two %s files', (format) => {
 	  const before = getFixturePathFlat(`before.${format}`);
      const after = getFixturePathFlat(`after.${format}`);
      expect(genDiff(before, after)).toString(expected);
   });
 test.each(formatsNested)('compare two %s files', (format) => {
 	  const before = getFixturePathNested(`before.${format}`);
      const after = getFixturePathNested(`after.${format}`);
      console.log(before);
      console.log(after);
      console.log(genDiff(before, after))
      expect(genDiff(before, after)).toString(expectedNested);
   });