const express = require('express')
const router = express.Router()

router.use('/bookingkamaroperasi', require('./bookings.routes'))

module.exports = router