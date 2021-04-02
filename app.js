var express = require("express");
var path = require("path");

/* Middlewares */
var logger = require("morgan");
var cookieParser = require("cookie-parser");

/* Utils */
var createError = require("http-errors");

/* Routers */
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog");

/* GraphQL */
const { apolloServer } = require("./graphQL");

/* Database */
var MongoDB = require("./mongoDb.js");

var app = express();

// Apply GraphQL Server
apolloServer.applyMiddleware({ app });

// view engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/* Request Middlewares setup */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* Route Handler setup */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

/* Response Middleware setup */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
