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
exports.book_list = function (req, res, next) {
  const callback = (err, bookList) => {
    if (err) next(err);
    else res.render("book_list", { title: "Book List", book_list: bookList });
  };

  Book.find({}, "title author").populate("author").exec(callback);
};

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
  const book = (callback) =>
    Book.findById(req.params.id)
      .populate("author")
      .populate("genre")
      .exec(callback);

  const bookInstance = (callback) =>
    BookInstance.find({ book: req.params.id }).exec(callback);

  const parallelCallback = (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.book == null) {
      // No results.
      var err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render("book_detail", {
      title: results.book.title,
      book: results.book,
      book_instances: results.bookInstance,
    });
  };

  async.parallel({ book, bookInstance }, parallelCallback);
};

// Display book create form on GET.
exports.book_create_get = function (req, res, next) {
  const authors = (callback) => Author.find(callback);
  const genres = (callback) => Genre.find(callback);

  // Get all authors and genres, which we can use for adding to our book.
  async.parallel(
    {
      authors,
      genres,
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("book_form", {
        title: "Create Book",
        authors: results.authors,
        genres: results.genres,
      });
    }
  );
};

// Handle book create on POST.
exports.book_create_post = (req, res, next) => {
  const { title, author, summary, isbn, genre } = req.body;

  var book = new Book({
    title,
    author,
    summary,
    isbn,
    genre,
  });

  // Data from form is valid. Save book.
  book.save(function (err) {
    if (err) {
      return next(err);
    }
    //successful - redirect to new book record.
    res.redirect(book.url);
  });
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
