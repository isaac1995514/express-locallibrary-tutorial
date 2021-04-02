const Author = require("../models/author");
const Book = require("../models/book");

const { body, validationResult } = require("express-validator");

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
  res.render("author_form", { title: "Create Author" });
};

// Handle Author create on POST.
const author_create_post = (req, res, next) => {
  const { first_name, family_name, date_of_birth } = req.body;

  var author = new Author({
    first_name,
    family_name,
    date_of_birth,
  });
  author.save(function (err) {
    if (err) {
      return next(err);
    }
    // Successful - redirect to new author record.
    res.redirect(author.url);
  });
};

// Handle Author delete on POST.
const author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

module.exports = {
  author_list,
  author_detail,
  author_create_get,
  author_create_post,
  author_delete_post,
};
