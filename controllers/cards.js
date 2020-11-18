const path = require('path');
const readFile = require('../utils/fsReader.js');
const mongoose = require('mongoose');
const { link } = require('fs');

const pathToData = path.join(__dirname, '..', 'data', 'cards.json');

module.exports.getCards = (req, res) => {
  readFile(pathToData)
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
};

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: [
    {
      name: {
        type: String,
      },
      about: {
        type: String,
      },
      avatar: {
        type: link,
      },
      id: {
        type: String,
      }
    }
  ],
  createdAt: {
    Date.now
  }
})

module.exports = mongoose.model('card', cardSchema);