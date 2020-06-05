import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
//const readFile = (filename) => JSON.parse(fs.readFile(getFixturePath(filename), 'utf-8'));

let expected;
const before = getFixturePath('before.json');
const after = getFixturePath('after.json');
const result = getFixturePath('result.diff')

beforeAll(() => {
  expected = fs.readFileSync(result, 'utf-8');
});

 test('genDiff', () => {
      expect(genDiff(before, after)).toString(expected);
   });
