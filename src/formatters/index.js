import stylish from './stylish.js';
import json from './json.js';
const formatSelection = (obj, format) => {
	switch (format) {
		case 'stylish':
		  return stylish(obj);
		case 'json':
		  return json(obj);
		default:
		  throw new Error(`Unknown format: '${ext}'!`);
	}
}
export default formatSelection;