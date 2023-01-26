function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkBookingInput(req, res, next) {

    const {bookingDate, bookingHour, bookingDuration } = req.params
    if (bookingDate && bookingHour && bookingDuration) {
        next()
    } else {
        res.status(400).json({ message: 'your input is missing something, check again.' })
    }
}

module.exports = {
    mustBeInteger,
    checkBookingInput
}