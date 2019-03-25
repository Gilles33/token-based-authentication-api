const express = require('express')
const router = express.Router()
const User = require('../models/user')

// route just for testing
router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) next(err)
    return res.status(200).send(users)
  })
})

module.exports = router
