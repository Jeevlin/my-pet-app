const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()
const petC = require('../controllers/petC')


router.post('/addPet',auth.verifyDoc.single('photoURLs'),petC.addPet)
router.put('/editPet/:id',auth.verifyDoc.single('photoURLs'),petC.editPet)
router.put('/quickEditPet/:id',petC.quickEditPet)
router.get('/getPets',petC.getPets)
router.get('/findPet/:petId',petC.findPet)
router.delete('/deletePet/:id',petC.deletePet)

module.exports=router