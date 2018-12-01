/*
var express = require('express')

var router = express.Router()
var Users = require('./api/route-users')
var Transactions = require('./api/route-transactions')


router.use('/api/user', Users);
router.use('/api/transactions', Transactions)


module.exports = router;
*/
var express = require('express')

var router = express.Router()

var UserController = require('../controllers/usercontroller');

router.get('/u', UserController.getUsers)           //Works
router.post('/u', UserController.createUsers)       //Does not like line 21 of user controller
router.put('/u', UserController.updateUsers)
router.delete('/u/:id',UserController.removeUsers)  //works, but gives the 400 error and says it doesn't, check userserive line 67

var TransactionController = require('../controllers/transactioncontroller');

router.get('/t', TransactionController.getTransactions)
router.post('/t', TransactionController.createTransactions)
router.put('/t', TransactionController.updateTransactions)
router.delete('/t/:id',TransactionController.removeTransactions)

module.exports = router;
