const express = require('express')

const router = express.Router()
const categoryC = require('../controllers/categoryC')

router.post('/addCategory',categoryC.addCategory)
router.get('/getCategory',categoryC.getCategory)

module.exports=router
