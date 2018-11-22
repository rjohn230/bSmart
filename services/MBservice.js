const MB = require('../models/MB.model')

_this = this

exports.getMB = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var MBget = await MB.paginate(query, options)
        return MBget;
    } catch (e) {
        throw Error('Error while Paginating MBget')
    }
}

exports.createMB = async function(MBcreate){

    var newMB = new MB({
        ID: MBcreate.ID,
        rent: MBcreate.rent,
        food: MBcreate.food,
        entertainment: MBcreate.entertainment,
        travel: MBcreate.travel,
        bills: MBcreate.bills,
        custom: MBcreate.custom,
        revenue: MBcreate.revenue
    })

    try{
        var savedMB = await newMB.save()
        return savedMB;
    }catch(e){
        throw Error("Error while Creating newMB")
    }
}

exports.updateMB = async function(MBupdate){
    var id = MBupdate.id

    try{
        var oldMB = await MB.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the MB")
    }

    if(!oldMB){
        return false;
    }

    console.log(oldMB)

    oldMB.ID = MBupdate.ID
    oldMB.rent = MBupdate.rent
    oldMB.food = MBupdate.food
    oldMB.entertainment = MBupdate.entertainment
    oldMB.travel = MBupdate.travel
    oldMB.bills = MBupdate.bills
    oldMB.custom = MBupdate.custom
    oldMB.revenue = MBupdate.revenue

    console.log(oldMB)

    try{
        var savedMB = await oldMB.save()
        return savedMB;
    }catch(e){
        throw Error("And Error occured while updating the MB");
    }
}

exports.deleteMB = async function(id){

    try{
        var deleted = await MB.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("MB Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the MB")
    }
}
