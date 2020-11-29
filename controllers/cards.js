const cardModel = require('../models/card.js');

module.exports.getCards = (req, res) => {
  cardModel.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  cardModel.create({ owner, ...req.body })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { _id } = req.params;
  cardModel.findByIdAndRemove({ _id })
    .orFail(() => {
      const error = new Error('Нет карточки с таким id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
      }
    });
};

module.exports.likeCard = (req, res) => cardModel.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    const error = new Error('Нет карточки с таким id');
    error.statusCode = 404;
    throw error;
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(404).send({ message: 'Нет карточки с таким id' });
    } else {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    }
  });

module.exports.dislikeCard = (req, res) => cardModel.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    const error = new Error('Нет карточки с таким id');
    error.statusCode = 404;
    throw error;
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(404).send({ message: err.message });
    } else {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    }
  });
