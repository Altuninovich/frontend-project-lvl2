import parsers from './parsers.js'
const fs = require('fs');
const genDiff = (pathToFile1, pathToFile2, format) => {
	const data1 = parsers(pathToFile1);
	const data2 = parsers(pathToFile2);
	const arrKey = Object.keys({ ...data1, ...data2});

  const checkingValues = (key) => {
  if (data1[key] === data2[key]) {
   return [`  ${key}: ${data2[key]}`];
  } 
  return [` - ${key}: ${data1[key]}`, ` + ${key}: ${data2[key]}`];
};

  const comparisonResult = arrKey.reduce((acc, key) => {
    if (data1.hasOwnProperty(key) && !data2.hasOwnProperty(key)) {
      return [...acc, ` - ${key}: ${data1[key]}`]
    }
    if (!data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) {
      return [...acc, ` + ${key}: ${data2[key]}`]
    }
    return [...acc, ...checkingValues(key)]
  }, []).join('\n');

return `{
${comparisonResult}
}`; 

};
export default genDiff;

