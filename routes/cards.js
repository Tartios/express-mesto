const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:_id', deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
