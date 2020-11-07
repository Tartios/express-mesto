const fsPromise = require('fs').promises;

module.exports = (path) => {
  return fsPromise.readFile(path, { encoding: 'utf8' }).then((data) => {
    return JSON.parse(data);
  });
};
