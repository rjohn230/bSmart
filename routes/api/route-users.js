var express = require('express')

var router = express.Router()

var UserController = require('../../controllers/usercontroller');

router.get('/user', UserController.getUsers)
router.post('/user', UserController.createUsers)
router.put('/user', UserController.updateUsers)
router.delete('/user/:id',UserController.removeUsers)

module.exports = router;
