const express = require('express')
const router = express.Router()
const bookingsModel = require('../models/booking.model')
const middleware = require('../helpers/middlewares')

//getBookings
router.get('/', async(req,res)=>{
    await bookingsModel.getBookings()
    .then(result=>res.json(result))
    .catch(err =>{
        if(err.status) res.status(err.status).json({message : err.message})
        else res.status(500).json({message:"Internal Server Error"})
    })
})

// createBookings
router.post('/:bookingDate/:bookingHour/:bookingDuration', middleware.checkBookingInput, async(req, res)=>{
    await bookingsModel.createBookings(req.params)
    .then(result => res.status(201).json({
        message :'true'
    }))
    .catch(err =>{
        if(err.status) res.status(err.status).json({message : err.message})
        else 
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    })
})


module.exports = router

