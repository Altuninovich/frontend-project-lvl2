import render from './render.js';

const getFormatJson = (obj1, obj2) => JSON.stringify(render(obj1, obj2));

export default getFormatJson;