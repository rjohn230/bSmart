const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate')


const TransactionSchema = mongoose.Schema({
  transaction_id: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date, //This is a date object, so it's a bit wackier than normal
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});
TransactionSchema.plugin(mongoosePaginate)
const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);
