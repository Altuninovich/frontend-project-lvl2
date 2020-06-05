const fs = require('fs');
const genDiff = (pathToFile1, pathToFile2) => {
	const dataJson1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
	const dataJson2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));
	const arrKey = Object.keys({ ...dataJson1, ...dataJson2});

  const checkingValues = (key) => {
  if (dataJson1[key] === dataJson2[key]) {
   return [`  ${key}: ${dataJson2[key]}`];
  } 
  return [` - ${key}: ${dataJson1[key]}`, ` + ${key}: ${dataJson2[key]}`];
};

  const comparisonResult = arrKey.reduce((acc, key) => {
    if (dataJson1.hasOwnProperty(key) && !dataJson2.hasOwnProperty(key)) {
      return [...acc, ` - ${key}: ${dataJson1[key]}`]
    }
    if (!dataJson1.hasOwnProperty(key) && dataJson2.hasOwnProperty(key)) {
      return [...acc, ` + ${key}: ${dataJson2[key]}`]
    }
    return [...acc, ...checkingValues(key)]
  }, []).join('\n');

return `{
${comparisonResult}
}`;  
};
export default genDiff;

