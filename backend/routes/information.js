const express = require('express')
const router = express.Router()
// middleware
const { auth } = require('../middleware/authentication')
// controller
const { insertInformation, listInformation, getInformation, updateInformation, payInstallment, putBacklist, removeInformation } = require('../controller/information')

router.post('/information-insert', auth, insertInformation)
router.get('/information-list/:type/:search', auth, listInformation)
router.get('/information-get/:id', auth, getInformation)
router.put('/information-update/:id', auth, updateInformation)
router.put('/information-pay/:id', auth, payInstallment)
router.put('/information-backlist/:id', auth, putBacklist)
router.delete('/information-remove/:id', auth, removeInformation)

module.exports = router