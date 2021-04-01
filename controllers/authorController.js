const Author = require("../models/author");
const Book = require("../models/book");

const async = require("async");

// Display list of all Authors.
const author_list = function (req, res, next) {
  const callback = (err, authorList) => {
    if (err) return next(err);

    res.render("author_list", {
      title: "Author List",
      author_list: authorList,
    });
  };

  Author.find()
    .sort([["family_name", "ascending"]])
    .exec(callback);
};

// Display detail page for a specific Author.
const author_detail = function (req, res) {
  const author = (callback) => Author.findById(req.params.id).exec(callback);

  const bookFromAuthor = (callback) =>
    Book.find({ author: req.params.id }, "title summary").exec(callback);

  const parallelCallback = (err, results) => {
    if (err) {
      return next(err);
    } // Error in API usage.
    if (results.author == null) {
      // No results.
      var err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render("author_detail", {
      title: "Author Detail",
      author: results.author,
      author_books: results.bookFromAuthor,
    });
  };

  async.parallel(
    {
      author,
      bookFromAuthor,
    },
    parallelCallback
  );
};

// Display Author create form on GET.
const author_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST.
const author_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Display Author delete form on GET.
const author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
const author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
const author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
const author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};

module.exports = {
  author_list,
  author_detail,
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post,
};
