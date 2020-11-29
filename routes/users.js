const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:userId', getUser);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
