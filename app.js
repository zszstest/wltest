var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Sequelize = require("sequelize");
var config = require("./env.json")[process.env.NODE_ENV || "development"];

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

var sequelize = new Sequelize(
  "postgres://" +
    config.DATABASE_USER_NAME_PASSWORD +
    "@" +
    config.DATABASE_URI +
    "/" + config.DATABASE_NAME
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./dist/wltest"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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

sequelize
  .authenticate()
  .then(function () {
    console.log("Connection of wltest app has been established successfully.", config);
  })
  .catch(function (err) {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
