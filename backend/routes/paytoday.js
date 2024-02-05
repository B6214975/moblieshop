const express = require('express')
const router = express.Router()
// middleware
const { auth } = require('../middleware/authentication')
// controller
const { listPaytoday } = require('../controller/paytoday')


router.get('/paytoday-list/:search', auth, listPaytoday)


module.exports = router