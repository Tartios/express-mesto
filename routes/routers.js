const router = require('express').Router();
const cardsRouter = require('./cards.js');
const usersRouter = require('./users.js');
const userIdRouter = require('./user_id.js')

router.use('/', cardsRouter);

router.use('/', userIdRouter);

router.use('/', usersRouter);

module.exports = router;
