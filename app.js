/**
 * @file Where the program is run, contains the middleware, routes, and connects to the database.
 */
const config = require('./utils/config')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

/* calling controller variables */
const loginRouter = require('./controllers/login')
const signupRouter = require('./controllers/signup')
const videoRouter = require('./controllers/video')
const awsRouter = require('./controllers/awsS3')
const middleware = require('./utils/middleware')

/* setting the uri based on if the file has access to the env */
<<<<<<< HEAD
const uri = config.MONGODB_URI
  ? config.MONGODB_URI
=======
console.log(config.MONGODB_URL)
const uri = config.MONGODB_URL
  ? config.MONGODB_URL
>>>>>>> 105b0cc (mongodb URI fix)
  : ''

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log(error.message)
  })

/*
 * Request processing
 */
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(middleware.reqLog)
app.use(middleware.tokenGet)
app.use(middleware.userGet)

/*
 * Routers
 */
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/video', videoRouter)
app.use('/s3Url', awsRouter)

/*
 * Error Handling
 */
app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
