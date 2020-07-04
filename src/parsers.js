import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (data, ext) => {
  switch (ext) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown format: '${ext}'!`);
  }
};

export default parsers;
