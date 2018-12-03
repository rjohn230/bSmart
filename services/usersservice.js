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
        throw Error('Error while paginating usersget')
    }
}

exports.createUsers = async function(usercreate){

    var newUser = new User({
        username: usercreate.username,
        email: usercreate.email,
        password: usercreate.password
    })
    console.log(usercreate);
    try{
        var savedUser = await newUser.save()
        return savedUser;
    }catch(e){
        throw Error("Error while creating newUser: " + e)  // Or whatever javascript wants idk
    }
}

exports.updateUsers = async function(userupdate){
    var id = userupdate.id

    try{
        var oldUser = await User.findById(id);
    }catch(e){
        // TODO remove this junk:
        // node.log(e)
        // print(e)
        // whatever_js_wants(e)
        console.log("error finding user")
        throw Error("Error occured while finding the user")
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
        throw Error("An error occured while updating the user");
    }
}

exports.deleteUser = async function(id){

    try{
        var deleted = await User.remove({_id: id})
        if(deleted.result === 0){
            throw Error("User could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error occured while deleting the User"+e)
    }
}
