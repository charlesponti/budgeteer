const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "root",
    fields: {
      message: {
        type: GraphQLString,
        resolve: () => "Hello World"
      }
    }
  })
});
