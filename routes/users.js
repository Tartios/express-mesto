const router = require('express').Router();
const { getUsers, getUser } = require('../controllers/users.js');

router.get('/users', getUsers);

router.get('/users/:_id', getUser);

module.exports = router;
