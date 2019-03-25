const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var exports = module.exports = {}

exports.create = (req, res, next) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8)

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }, function (err, user) {
    if (err) return res.status(500).send('A problem occurs on registering the user')
    try {
      let token = signToken(user)
      return res.status(200).send({ auth: true, token: token })
    } catch (err) {
      next(err)
    }
  })
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }, '+ password', function (err, user) {
    if (err) return res.status(500).send({ auth: false, message: 'Authentication error : A problem occurs on login' })
    if (!user) return res.status(404).send({ auth: false, message: 'Authentication error : Wrong email/password' })

    try {
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) return res.status(404).send({ auth: false, message: 'Authentication error : Wrong email/password' })

      let token = signToken(user)
      return res.status(200).send({ auth: true, token: token })
    } catch (err) {
      next(err)
    }
  })
}

function signToken (user) {
  return jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 43200 }) // token lasts for 12 hours
}
