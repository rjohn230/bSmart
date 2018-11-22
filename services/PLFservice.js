const PLF = require('../models/PLF.model')

_this = this

exports.getPLF = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var PLFget = await PLF.paginate(query, options)
        return PLFget;
    } catch (e) {
        throw Error('Error while Paginating PLFget')
    }
}

exports.createPLF = async function(PLFcreate){

    var newPLF = new PLF({
        ID: PLFcreate.ID,
        rent: PLFcreate.rent,
        food: PLFcreate.food,
        entertainment: PLFcreate.entertainment,
        travel: PLFcreate.travel,
        bills: PLFcreate.bills,
        custom: PLFcreate.custom,
        revenue: PLFcreate.revenue
    })

    try{
        var savedPLF = await newPLF.save()
        return savedPLF;
    }catch(e){
        throw Error("Error while Creating newPLF")
    }
}

exports.updatePLF = async function(PLFupdate){
    var id = PLFupdate.id

    try{
        var oldPLF = await PLF.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the PLF")
    }

    if(!oldPLF){
        return false;
    }

    console.log(oldPLF)

    oldPLF.ID = PLFupdate.ID
    oldPLF.rent = PLFupdate.rent
    oldPLF.food = PLFupdate.food
    oldPLF.entertainment = PLFupdate.entertainment
    oldPLF.travel = PLFupdate.travel
    oldPLF.bills = PLFupdate.bills
    oldPLF.custom = PLFupdate.custom
    oldPLF.revenue = PLFupdate.revenue

    console.log(oldPLF)

    try{
        var savedPLF = await oldPLF.save()
        return savedPLF;
    }catch(e){
        throw Error("And Error occured while updating the PLF");
    }
}

exports.deletePLF = async function(id){

    try{
        var deleted = await PLF.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("PLF Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the PLF")
    }
}
