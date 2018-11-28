const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate');


const MBSchema = mongoose.Schema ({
  ID: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  food: {
    type: Number,
    required: true
  },
  entertainment: {
    type: Number,
    required: true
  },
  travel: {
    type: Number,
    required: true
  },
  bills: {
    type: Number,
    required: true
  },
  custom: {
    type: Number,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  }
});
MBSchema.plugin(mongoosePaginate)
const MB = module.exports = mongoose.model('MB', MBSchema);