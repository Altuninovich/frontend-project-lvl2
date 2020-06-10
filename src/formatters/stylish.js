const tab = (x) => ' '.repeat(x);

const getSpace = (key, depth) => {
  const firstSymbol = key.split('')[0];
  const newDepth = firstSymbol === '+' || firstSymbol === '-' ? depth - 2 : depth;
  return tab(newDepth);
};

const getFormatStylish = (formatObj) => {

  const iter = (obj, spaceStr, spaceBracket) => {

	const arrUniqueKey = Object.keys(obj);

	const result = arrUniqueKey.reduce((acc, key) => {
    const value = obj[key];

		if (typeof(value) === 'object') {
			return  `${acc}${getSpace(key, spaceStr)}${key}: ${iter(value, spaceStr + 4, spaceBracket +4)}`;
		}
  return `${acc}${getSpace(key, spaceStr)}${key}: ${value}\n`;
	},'');
return `{\n${result}${tab(spaceBracket)}}\n`;
  };

  return iter(formatObj, 4, 0);
};

export default getFormatStylish;