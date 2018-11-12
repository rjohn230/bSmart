var express = require('express')

var router = express.Router()
var Users = require('./api/route-users')
var Transactions = require('./api/route-transactions')


router.use('/user', Users);
router.use('/transactions', Transactions)


module.exports = router;
