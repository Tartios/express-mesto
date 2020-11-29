const userModel = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  userModel.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.params._id;
  userModel.findOne({ userId })
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
        res.status(400).send({ message: 'Данные переданные пользователем некорректны.' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
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
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const owner = req.user._id;
  const params = req.body;
  userModel.findByIdAndUpdate(owner, params, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(owner, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.send({ message: err.message });
    });
};
