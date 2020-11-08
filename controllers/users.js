const readFile = require('../utils/fsReader.js');
const path = require('path');
const pathToData = path.join(__dirname, '..', 'data', 'users.json');

module.exports.getUsers = (req, res) => {
  readFile(pathToData)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
    });
};

module.exports.getUser = (req, res) => {
  console.log(req);
  const { _id } = req.params;
  readFile(pathToData).then(data => {
    const user = data.find((item) => {
      return item._id === _id;
    })
    if (!user) {
      return res.status(404).send({ message: "Нет пользователя с таким id" });
    }

    res.send(user);
  })
  .catch((err) => {
    res.status(500).send({ message: "Запрашиваемый ресурс не найден" });
  });
};
