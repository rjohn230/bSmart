var express = require('express')

var router = express.Router()

var MBController = require('../../controllers/MBcontroller');

router.get('/MB/', MBController.getMB)
router.post('/MB/', MBController.createMB)
router.put('/MB/', MBController.updateMB)
router.delete('/MB/:id',MBController.removeMB)

module.exports = router;
