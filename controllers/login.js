/**
 * @file Contains requests pertaining to user login attempts.
 * @author Yacine Saoudi
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const compare = await bcrypt.compare(body.password, user.passHash)
  console.log(compare)

  if (!(user && compare)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const tokenData = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(tokenData, process.env.SECRET)

  response
    .status(200)
    .send ({ token })
})

module.exports = loginRouter
