const PLFservice = require('../services/PLFservice')

_this = this

exports.getPLF = async function(query, page, limit){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try{
        var PLF = await PLFservice.getPLF({}, page, limit)
        return res.status(200).json({status: 200, data: PLF, message: "Succesfully Recieved PLF"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createPLF = async function(req, res, next){
    var PLF = {
        ID: PLFcreate.ID,
        rent: PLFcreate.rent,
        food: PLFcreate.food,
        entertainment: PLFcreate.entertainment,
        travel: PLFcreate.travel,
        bills: PLFcreate.bills,
        custom: PLFcreate.custom,
        revenue: PLFcreate.revenue
    }

    try{
        var createdPLF = await PLFService.createPLF(PLF)
        return res.status(201).json({status: 201, data: createPLF, message: "Succesfully Created PLF"})
    }catch(e){
        return res.status(400).json({status: 400, message: "PLF Creation was Unsuccesfull"})
    }
}

exports.updatePLF = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var PLF = {
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
        var updatedPLF = await PLFService.updatePLF(PLF)
        return res.status(200).json({status: 200, data: updatedPLF, message: "Succesfully Updated PLF"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePLF = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await PLFService.deletePLF(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted PLF"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
