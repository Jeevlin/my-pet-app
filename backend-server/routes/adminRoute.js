const express = require('express')
const auth =require('../middleware/auth')
const router = express.Router()
const adminC = require('../controllers/adminC')

router.post('/addAdmin',adminC.addAdmin)
router.post('/login',adminC.login)
router.post("/credentials",adminC.sendCredentials)

module.exports=router
