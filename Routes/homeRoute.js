const express = require('express')
const router = express.Router()
const {
  userHome
} = require('../Controllers/homeController')

router.get('/', userHome);


module.exports = router