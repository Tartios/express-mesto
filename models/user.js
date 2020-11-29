const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(http|https):\/\/(www)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{1,}#?/.test(v),
    },
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
