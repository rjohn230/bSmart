/*
Carbon copy of the usermodel javascript file. Might be horribly incorrect
@bcrypt: this will be used to encrypt things once this file works properly
*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const TransactionSchema = mongoose.Schema({
  transaction_id: {
    type: Integer,
    required: true
  },
  amount: {
    type: Double,
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

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);
