const {sendPassword,verifyPassword,getUserProfile} = require('../controllers/loginController.js')
const router = require('express').Router()

router.post('/sendPassword', sendPassword)
router.post('/verifyPassword', verifyPassword)
router.get('/getUser', getUserProfile)

module.exports = router