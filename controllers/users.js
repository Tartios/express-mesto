const userModel = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  userModel.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.getUser = (req, res) => {
  const { _id } = req.params;
  userModel.findOne({ _id })
    .orFail(() => {
      const error = new Error('Нет пользователя с таким id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.send({ message: 'Данные переданные пользователем некорректны.' });
      } else if (err.statusCode === 404) {
        res.send({ message: 'Пользователь с таким id не найден.' });
      } else {
        res.status(500).send({ message: 'Запрашиваемый ресурс не найден.' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send({ message: err.message });
      } else {
        res.send(err);
      }
    });
};
