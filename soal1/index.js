
const express = require('express')
const morgan = require('morgan')
const app = express()
const routes = require('./routes/index.routes')
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

// Starting server
app.listen('8080')