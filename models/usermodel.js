//TODO: model for making entires in the database
//stuff in here subject to change
//model file creates requests to database via mongoose. It is also responsible
//for functions like looking up users by their database entries EX: username, email
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema ({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
