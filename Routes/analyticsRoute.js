const express = require('express')
const router = express.Router()
const {
  piechat,
  bargraph
} = require('../Controllers/analyticsController')

router.post('/piechat/:startdate/:enddate', piechat);
router.post('/bargraph/:startdate/:enddate',bargraph)


module.exports = router