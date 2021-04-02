const Genre = require("../../models/genre");

const resolvers = {
  Query: {
    genres: () => Genre.find(),
  },
  Mutation: {
    createGenre: async (_, args) => {
      try {
        const newGenre = new Genre({ name: args.name });
        await newGenre.save();
        return newGenre;
      } catch (e) {
        console.error(e);
      }
    },
  },
};

module.exports = {
  resolvers,
};
