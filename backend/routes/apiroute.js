var express = require('express')

var router = express.Router()
var Users = require('./api/route-users')
var Transactions = require('./api/route-transactions')
var MBs = require('./api/route-MB')


router.use('/user', Users);
router.use('/transactions', Transactions)
router.use('/MB', MBs)

module.exports = router;
