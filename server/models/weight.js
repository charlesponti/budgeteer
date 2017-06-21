var mongoose = require('mongoose')
var GraphQLDate = require('graphql-date')
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

// new GraphQLObjectType({
//   name: "Foo",
//   description: "Some foo type",
//   fields: {
//     _id: { type: GraphQLString },
//     kgs: { type: GraphQLString },
//     lbs: { type: GraphQLString },
//     created: {
//       type: GraphQLDate,
//       description: "Date foo was created"
//     }
//   }
// });
export const typeDef = `
  type Weight {
    _id: String
    kgs: String
    lbs: String
    user(_id: String): User
    date: Date
  }
`

var WeightSchema = mongoose.Schema({
  kgs: String,
  lbs: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date
})

module.exports = mongoose.model('Weight', WeightSchema)
