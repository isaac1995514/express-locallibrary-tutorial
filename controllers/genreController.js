const Genre = require("../models/genre");

var Book = require("../models/book");
var async = require("async");

// Display list of all Genre.
exports.genre_list = function (req, res) {
  const callback = (err, genreList) => {
    if (err) return next(err);

    res.render("genre_list", {
      title: "Genre List",
      genre_list: genreList,
    });
  };

  Genre.find()
    .sort([["name", "ascending"]])
    .exec(callback);
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res, next) {
  const genre = (callback) => Genre.findById(req.params.id).exec(callback);

  const genreBook = (callback) =>
    Book.find({ genre: req.params.id }).exec(callback);

  const parallelCallback = (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.genre == null) {
      // No results.
      var err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render
    res.render("genre_detail", {
      title: "Genre Detail",
      genre: results.genre,
      genre_books: results.genreBook,
    });
  };

  async.parallel({ genre, genreBook }, parallelCallback);
};
