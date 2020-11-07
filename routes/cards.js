const router = require('express').Router();
const { getCards } = require('../controllers/cards.js');

router.use('/cards', getCards);

module.exports = router;
