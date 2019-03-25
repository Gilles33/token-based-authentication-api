let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  username: String,
  // eslint-disable-next-line no-useless-escape
  email: { type: String, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'is invalid'] },
  password: { type: String, select: false }
})

let User = mongoose.model('user', userSchema)

module.exports = User
