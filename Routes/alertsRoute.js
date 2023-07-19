const express = require('express')
const router = express.Router()
const {
  userAlerts
} = require('../Controllers/alertsController')

router.post('/:id', userAlerts);


module.exports = router