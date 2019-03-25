const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

var verifyToken = (req, res, next) => {
  let token = req.token
  if (!token) return res.status(403).send({ auth: false, message: 'Authentication error : no token provided' })

  jwt.verify(token, secret, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Authentication error : failed to authenticate token' })

    req.userID = decoded.id
    next()
  })
}

module.exports = verifyToken
