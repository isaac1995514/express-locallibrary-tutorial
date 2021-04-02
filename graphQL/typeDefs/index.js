const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    genres: [Genre!]
  }

  type Genre {
    name: String!
    id: ID!
  }

  type Mutation {
    createGenre(name: String!): Genre
  }
`;

module.exports = {
  typeDefs,
};
