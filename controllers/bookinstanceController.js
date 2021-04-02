const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");

// Display list of all BookInstances.
exports.bookinstance_list = function (req, res, next) {
  const callback = (err, bookInstanceList) => {
    if (err) return next(err);

    res.render("bookinstance_list", {
      title: "Book Instance List",
      bookinstance_list: bookInstanceList,
    });
  };

  BookInstance.find().populate("book").exec(callback);
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function (req, res) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function (err, bookinstance) {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) {
        // No results.
        var err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("bookinstance_detail", {
        title: "Copy: " + bookinstance.book.title,
        bookinstance: bookinstance,
      });
    });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function (req, res) {
  Book.find({}, "title").exec(function (err, books) {
    if (err) {
      return next(err);
    }
    // Successful, so render.
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books,
    });
  });
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = (req, res, next) => {
  const { book, imprint, status, due_back } = req.body;

  // Create a BookInstance object with escaped and trimmed data.
  var bookinstance = new BookInstance({
    book,
    imprint,
    status,
    due_back,
  });

  // Data from form is valid.
  bookinstance.save(function (err) {
    if (err) {
      return next(err);
    }
    // Successful - redirect to new record.
    res.redirect(bookinstance.url);
  });
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};
