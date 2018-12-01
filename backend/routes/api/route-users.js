var express = require('express')

var router = express.Router()

var UserController = require('../../controllers/usercontroller');

router.get('/users', UserController.getUsers)
router.post('/users', UserController.createUsers)
router.put('/users', UserController.updateUsers)
router.delete('/users/:id',UserController.removeUsers)

module.exports = router;
