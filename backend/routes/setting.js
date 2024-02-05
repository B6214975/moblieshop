const express = require('express')
const router = express.Router()
// middleware
const { auth } = require('../middleware/authentication')
// controller
const { insertPhone
    , listSetting
    , deletePhone
    , insertMemory
    , deleteMemory
    , insertColor
    , deleteColor } = require('../controller/setting')


router.get('/setting-list', auth, listSetting)
router.post('/setting-phone-insert', auth, insertPhone)
router.delete('/setting-phone-delete/:id', auth, deletePhone)
router.post('/setting-memory-insert', auth, insertMemory)
router.delete('/setting-memory-delete/:id', auth, deleteMemory)
router.post('/setting-color-insert', auth, insertColor)
router.delete('/setting-color-delete/:id', auth, deleteColor)


module.exports = router