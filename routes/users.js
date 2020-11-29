const router = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users.js');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:_id', getUser);

module.exports = router;
