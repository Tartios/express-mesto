const router = require('express').Router();
const { getUser } = require('../controllers/user_id.js');


router.get('/users/:_id', getUser);

module.exports = router;
