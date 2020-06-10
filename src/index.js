import parsers from './parsers.js';
import formatters from './formatters/index.js';
const fs = require('fs');
const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
	const dataBefore = parsers(pathToFile1);
	const dataAfter = parsers(pathToFile2);

	const render = (objFileBefore, objFileAfter) => {
   const arrUniqueKey = Object.keys({...objFileBefore, ...objFileAfter});
   
   const resObj = arrUniqueKey.reduce((acc, key) => {
     const valueBefore = objFileBefore[key];
     const valueAfter = objFileAfter[key];
    
     if (valueBefore && valueAfter) {
       if (typeof(valueBefore) === 'object' && typeof(valueAfter) === 'object') { 
           return Object.assign(acc, {[key]: render(valueBefore, valueAfter)});     
         }
         if (valueBefore === valueAfter) {
          return Object.assign(acc, {[key]: valueBefore});
         }
        return Object.assign(acc, {[`- ${key}`]: valueBefore}, {[`+ ${key}`]: valueAfter})
     }

     if (valueBefore) {
       return Object.assign(acc, {[`- ${key}`]: valueBefore});
     }
     return Object.assign(acc, {[`+ ${key}`]: valueAfter});
   }, {});
   return resObj;
  }
	
  return formatters(render(dataBefore, dataAfter), format);

};
export default genDiff;

