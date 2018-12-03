var Transaction = require('../models/transaction.model')

_this = this


exports.getTransactions = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var transactionGet = await Transaction.paginate(query, options)
        return transactionGet;
    } catch (e) {
        throw Error('Error while Paginating Transaction')
    }
}

exports.createTransactions = async function(transactioncreate){

    var newTransaction = new Transaction({
        transaction_id: transactioncreate.transaction_id,
        amount: transactioncreate.amount,
        date: new Date(),
        name: transactioncreate.name,
        category: transactioncreate.category
    })

    try{
        var savedTransaction = await newTransaction.save()
        return savedTransaction;
    }catch(e){
        throw Error("Error while Creating Transaction")
    }
}

exports.updateTransactions = async function(transactionupdate){
    var id = transactionupdate.id

    try{
        var oldTransaction = await Transaction.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Transaction")
    }

    if(!oldTransaction){
        return false;
    }

    console.log(oldTransaction)

    oldTransaction.transaction_id = transactionupdate.transaction_id
    oldTransaction.amount = transactionupdate.amount
    oldTransaction.name = transactionupdate.name
    oldTransaction.category = transactionupdate.category


    console.log(oldTransaction)

    try{
        var savedTransaction = await oldTransaction.save()
        return savedTransaction;
    }catch(e){
        throw Error("And Error occured while updating the Transaction");
    }
}

exports.deleteTransactions = async function(id){
    try{
        var deleted = await Transaction.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Transaction Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Transaction")
    }
}
