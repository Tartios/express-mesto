const router = require('express').Router();
const { getCards } = require('../controllers/cards.js');
const { getUsers, getUser } = require('../controllers/users.js');

router.get('/cards', getCards);

router.get('/users', getUsers);

router.get('/users/:_id', getUser);

module.exports = router;
