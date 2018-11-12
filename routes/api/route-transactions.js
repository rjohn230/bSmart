var express = require('express')

var router = express.Router()

var TransactionController = require('../../controllers/transactioncontroller');

router.get('/transactions/', TransactionController.getTransactions)
router.post('/transactions/', TransactionController.createTransactions)
router.put('/transactions/', TransactionController.updateTransactions)
router.delete('/transactions/:id',TransactionController.removeTransactions)

module.exports = router;
