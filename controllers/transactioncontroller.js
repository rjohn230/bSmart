const TransactionService = require('../models/transaction.model')

_this = this

exports.getTransactions = async function(query, page, limit){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try{
        var todos = await TransactionService.getTransactions({}, page, limit)
        return res.status(200).json({status: 200, data: transaction, message: "Succesfully Recieved Transaction"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTransactions = async function(req, res, next){
    var transaction = {
        transaction_id: transactioncreate.transaction_id,
        amount: transactioncreate.amount,
        date: new Date(),
        name: transactioncreate.name,
        category: transactioncreate.category
    }

    try{
        var createdTransaction = await TransactionService.createTransaction(transaction)
        return res.status(201).json({status: 201, data: createdTransaction, message: "Succesfully Created Transaction"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Transaction Creation was Unsuccesfull"})
    }
}

exports.updateTransactions = async function(req, res, next){

    if(!req._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req._id;

    console.log(req)

    var transaction = {
        id,
        transaction_id: req.transaction_id ? req.transaction_id : null,
        amount: req.amount ? req.amount : null,
        date: req.date ? req.date : null,
        name: req.name ? req.name : null,
        category: req.category ? req.category : null
    }

    try{
        var updatedTransaction = await TransactionService.updateTransactions(transaction)
        return res.status(200).json({status: 200, data: updatedTransaction, message: "Succesfully Updated Transaction"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTransactions = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await TransactionService.deleteTransactions(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Transaction"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
