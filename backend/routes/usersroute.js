var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user resource');
});

/*post
router.post('/', function(req, res, next){
  username: req.body.username,
  email: req.body.email,
  password: req.body.password
});
*/

module.exports = router;
