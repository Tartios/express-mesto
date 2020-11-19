
const mongoose = require('mongoose');

module.exports.getUsers = (req, res) => {
  userModel.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.getUser = (req, res) => {
  const { _id } = req.params;
  userModel.findOne({_id})
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    return res.send(user);
  })
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

module.exports.createUser = (req, res) => {
  console.log(req.body)
  return null
}

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

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;