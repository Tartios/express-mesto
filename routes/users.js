const router = require('express').Router();
const { getUsers, getUser } = require('../controllers/users.js');

router.get('/', getUsers);

router.get('/:_id', getUser);

module.exports = router;
