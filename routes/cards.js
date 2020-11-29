const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:_id', deleteCard);

module.exports = router;
