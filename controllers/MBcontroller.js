const MBservice = require('../models/MBservice')

_this = this

exports.getMB = async function(query, page, limit){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try{
        var MB = await MBservice.getMB({}, page, limit)
        return res.status(200).json({status: 200, data: MB, message: "Succesfully Recieved MB"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createMB = async function(req, res, next){
    var MB = {
        ID: MBcreate.ID,
        rent: MBcreate.rent,
        food: MBcreate.food,
        entertainment: MBcreate.entertainment,
        travel: MBcreate.travel
        bills: MBcreate.bills
        custom: MBcreate.custom
        revenue: MBcreate.revenue
    }

    try{
        var createdMB = await MBService.createMB(MB)
        return res.status(201).json({status: 201, data: createMB, message: "Succesfully Created MB"})
    }catch(e){
        return res.status(400).json({status: 400, message: "MB Creation was Unsuccesfull"})
    }
}

exports.updateMB = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var MB = {
        id,
        ID: req.body.ID ? req.body.ID : null,
        rent: req.body.rent ? req.body.rent : null,
        food: req.body.food ? req.body.food : null,
        entertainment: req.body.entertainment ? req.body.entertainment : null,
        travel: req.body.travel ? req.body.travel : null,
        bills: req.body.bills ? req.body.bills : null,
        custom: req.body.custom ? req.body.custom : null,
        revenue: req.body.revenue ? req.body.revenue : null
    }

    try{
        var updatedMB = await MBService.updateMB(MB)
        return res.status(200).json({status: 200, data: updatedMB, message: "Succesfully Updated MB"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeMB = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await MBService.deleteMB(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted MB"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
