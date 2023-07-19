const express = require('express')
const middleware=require('../Middleware/middleware')
const router = express.Router()
const {
  registerUser,
  loginUser,
  myprofile,
} = require('../Controllers/userController')
// const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/myprofile', middleware, myprofile)

module.exports = router