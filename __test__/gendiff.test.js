import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
//const readFile = (filename) => JSON.parse(fs.readFile(getFixturePath(filename), 'utf-8'));
const formats = ['json', 'yml'];
let expected;

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result.diff'), 'utf-8');
});

 test.each(formats)('compare two %s files', (format) => {
 	  const before = getFixturePath(`before.${format}`);
      const after = getFixturePath(`after.${format}`);
      expect(genDiff(before, after)).toString(expected);
   });
