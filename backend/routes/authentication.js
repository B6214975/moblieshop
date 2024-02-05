const express = require('express')
const router = express.Router()
// middleware
const { auth, admin } = require('../middleware/authentication')
// controller
const { register, login, listUser, deleteUser, updateUser, updateUserEnabled, updateUserAdmin } = require('../controller/authentication')

router.post('/register', auth, admin, register)
router.put('/login', login)
router.get('/user-list', auth, admin, listUser)
router.delete('/user-delete/:id', auth, admin, deleteUser)
router.put('/user-update', auth, admin, updateUser)
router.put('/user-enabled/:id', auth, admin, updateUserEnabled)
router.put('/user-admin/:id', auth, admin, updateUserAdmin)

module.exports = router