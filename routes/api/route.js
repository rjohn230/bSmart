//TODO: express router goes here and exports
//handles GET, POST, PUT, DELETE requests
const express = require('express');

const router = express.Router();

//Basic syntax for how this goes, request, response.
//function is a placeholder name along with the chevrons(<>)
//GET
router.get('/', <function (req, res)>){
  res.send()
}
//POST
router.post('/',<function (req, res)>){
  res.send()
}
//PUT
router.put('/', <function (req, res)>){
  res.send()
}
//DELETE
router.delete('/', <function (req, res)>){
  res.send()
}
module.exports = router;
