/* GraphQL */
const { ApolloServer, gql } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = {
  apolloServer: server,
};
