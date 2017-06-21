var mongoose = require('mongoose')

var Schema = mongoose.Schema({
  payee: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  location: { type: Object },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Transaction', Schema)
