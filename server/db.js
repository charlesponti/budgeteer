import util from 'util'
import mongoose from 'mongoose'
const dbURL = process.env.MONGODB_URL || 'mongodb://localhost/backpack-dev'

// Require models
import './models/user'
import './models/weight'
import './models/transaction'
import './models/cost-per-day'
import './models/account'

// Connect to MongoDB
mongoose.connect(dbURL)

const db = mongoose.connection

db.once('open', function (err) {
  // Throw error if connection cannot be made to database
  if (err) throw new Error(err)
  // Log successful connection to database
  return util.log('Connected to ' + dbURL + ' database')
})

module.exports = db
