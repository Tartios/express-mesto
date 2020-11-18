const router = require('express').Router();
const { getUsers, getUser } = require('../controllers/users.js');

router.get('/', getUsers);

router.get('/:userId', getUser);

module.exports = router;
