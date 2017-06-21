import util from 'util'
import mongoose from 'mongoose'
const { DATABASE_URI } = process.env

// Require models
import '../models/user'
import '../models/weight'
import '../models/transaction'
import '../models/cost-per-day'
import '../models/account'

// Connect to MongoDB
mongoose.connect(DATABASE_URI || 'mongodb://127.0.0.1/test-app')

// Define database connection
const db = mongoose.connection

// Notify once database connection has opened
db.once('open', err => {
  // Throw error if connection cannot be made to database
  if (err) throw new Error(err)
  // Log successful connection to database
  return util.log(`Connected to ${DATABASE_URI} database`)
})

export default db
