import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml'

const parsers = (pathToFile) => {
	const ext = path.extname(pathToFile);
	const dataFile = fs.readFileSync(pathToFile, 'utf-8');

	switch(ext) {
		case '.json':
		  return JSON.parse(dataFile);
		case '.yml':
          return yaml.safeLoad(dataFile);
        default:
          throw new Error(`Unknown format: '${ext}'!`);
		}
	
};
export default parsers;