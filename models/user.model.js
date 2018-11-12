const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate');


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
UserSchema.plugin(mongoosePaginate)
const User = module.exports = mongoose.model('User', UserSchema);
