const User = require('../models/user.model')

_this = this

exports.getUsers = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var usersGet = await User.paginate(query, options)
        return usersGet;
    } catch (e) {
        throw Error('Error while Paginating usersget')
    }
}

exports.createUsers = async function(usercreate){

    var newUser = new User({
        username: usercreate.username,
        email: usercreate.email,
        password: usercreate.passsword
    })

    try{
        var savedUser = await newUser.save()
        return savedUser;
    }catch(e){
        throw Error("Error while Creating newUser")
    }
}

exports.updateUsers = async function(userupdate){
    var id = userupdate.id

    try{
        var oldUser = await User.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the user")
    }

    if(!oldUser){
        return false;
    }

    console.log(oldUser)

    oldUser.username = userupdate.username
    oldUser.email = userupdate.email
    oldUser.password = userupdate.password


    console.log(oldUser)

    try{
        var savedUser = await oldUser.save()
        return savedUser;
    }catch(e){
        throw Error("And Error occured while updating the user");
    }
}

exports.deleteUser = async function(id){

    try{
        var deleted = await User.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("User Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the User")
    }
}
