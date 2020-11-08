const readFile = require('../utils/fsReader.js');
const path = require('path');
const pathToData = path.join(__dirname, '..', 'data', 'cards.json');

module.exports.getCards = (req, res) => {
  readFile(pathToData)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};
