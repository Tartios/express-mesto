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
    .catch((err) => res.status(500).send(err));
};

module.exports.deleteCard = (req, res) => {
  const { _id } = req.params;
  cardModel.findByIdAndRemove({ _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err));
};
