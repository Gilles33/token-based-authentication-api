const express = require('express')
const app = express()
const morgan = require('morgan')
const bearerToken = require('express-bearer-token')
const authentication = require('./routes/authentication')
const User = require('./routes/user')
const verifyToken = require('./middlewares/verifyToken')
const bodyParser = require('body-parser')
require('./db')

app.use(bearerToken())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', authentication)
app.use(verifyToken)
app.use('/users', User)

app.post('*', (req, res) => {
  res.status(404).send('No route matches')
})

app.use((err, req, res, next) => {
  console.error(err)
  if (!res.headersSent) {
    res.status(500).json(err.toString())
  }
})

let port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Express server listening on port ' + port)
})
