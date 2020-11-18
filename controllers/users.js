const path = require('path');
const readFile = require('../utils/fsReader.js');
const mongoose = require('mongoose');

const pathToData = path.join(__dirname, '..', 'data', 'users.json');

module.exports.getUsers = (req, res) => {
  readFile(pathToData)
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.getUser = (req, res) => {
  const { _id } = req.params;
  readFile(pathToData).then((data) => {
    const user = data.find((item) => item._id === _id);
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    return res.send(user);
  })
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);