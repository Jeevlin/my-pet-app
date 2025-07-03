const express = require('express')
const auth=require('../middleware/auth')
const router = express.Router()
const orderC = require('../controllers/orderC')

router.post('/addOrder/',auth.authenticateFirebaseUser,orderC.addOrder)
router.get('/findOrder/:orderId',auth.authenticateFirebaseUser,orderC.findOrder)
router.delete('/deleteOrder/:orderId',orderC.deleteOrder)
router.get('/getOrder',orderC.getOrder)

module.exports=router
