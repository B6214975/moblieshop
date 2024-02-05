const express = require('express')
const router = express.Router()
// middleware
const { auth } = require('../middleware/authentication')
// controller
const { listBacklist } = require('../controller/backlist')


router.get('/backlist-list/:search', auth, listBacklist)


module.exports = router