const router = require('express').Router();
const cardsRouter = require('./cards.js');
const usersRouter = require('./users.js');

router.use('/cards', cardsRouter);

router.use('/users', usersRouter);

module.exports = router;
