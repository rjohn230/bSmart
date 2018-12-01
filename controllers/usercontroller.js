const UserService = require('../services/usersservice')

_this = this

exports.getUsers = async function(req, res, next){
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try{
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({status: 200, data: users, message: "Succesfully Recieved Users"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUsers = async function(req, res, next){
    var usercreate = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    try{
        var createdUser = await UserService.createUser(users)
        return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created User"})
    }catch(e){
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUsers = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var users = {
        id,
        username: req.body.username ? req.body.username : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }

    try{
        var updatedUser = await UserService.updateUser(userupdate)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUsers = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted User"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
