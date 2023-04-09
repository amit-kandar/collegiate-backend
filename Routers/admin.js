const express = require('express')
const verifyadmin = require('../Middleware/verify')
const upload = require('../middleware/uploads')
const admin = require('../Controller/admincontroller')

const router = express.Router()

router.post('/signup', upload.single('adminimage'), admin.signUp)

router.post('/signin', admin.signIn)

router.post('/getAdmin', verifyadmin, admin.getAdmin)

// router.get('/verify/token=:authtoken', admin.verifyUser)

// router.post('/forgetPassword', admin.forgetPassword)

// router.put('/verifyresetpassword/:userid', admin.createNewPass)

module.exports = router