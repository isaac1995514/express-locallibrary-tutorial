const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const async = require("async");

exports.index = function (req, res) {
  // Empty condition is refer to select all
  const countBook = (callback) => Book.countDocuments({}, callback);

  const countBookInstance = (callback) =>
    BookInstance.countDocuments({}, callback);

  const countAvailableBookInstance = (callback) =>
    BookInstance.countDocuments({ status: "Available" }, callback);

  const countAuthor = (callback) => Author.countDocuments({}, callback);

  const countGenre = (callback) => Genre.countDocuments({}, callback);

  const controllerCallback = (err, results) => {
    res.render("index", {
      title: "Local Library Home",
      error: err,
      data: results,
    });
  };

  async.parallel(
    {
      countBook,
      countBookInstance,
      countAvailableBookInstance,
      countAuthor,
      countGenre,
    },
    controllerCallback
  );
};

// Display list of all books.
exports.book_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Book list");
};

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Book detail: " + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};
