var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //var UserController = require('../controllers/usercontroller');
  //results = UserController.getUsers();
  //res.send(results);
  res.send('This is the usersroute!');
  res.end();
});

module.exports = router;
