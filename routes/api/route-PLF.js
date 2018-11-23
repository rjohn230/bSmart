var express = require('express')

var router = express.Router()

var PLFController = require('../../controllers/PLFcontroller');

router.get('/PLF/', PLFController.getPLF)
router.post('/PLF/', PLFController.createPLF)
router.put('/PLF/', PLFController.updatePLF)
router.delete('/PLF/:id',PLFController.removePLF)

module.exports = router;
