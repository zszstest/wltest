var cors = require('cors')
const express = require("express");
const cookieSession = require('cookie-session');
const passport = require("passport");

const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

var Sequelize = require("sequelize");
const keys = require('./config/keys');
var config = require("./env.json")[process.env.NODE_ENV || "development"];

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

var sequelize = new Sequelize(
  "postgres://" +
    config.DATABASE_USER_NAME_PASSWORD +
    "@" +
    config.DATABASE_URI +
    "/" +
    config.DATABASE_NAME
);

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(express.static("./dist/wltest"));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

sequelize
  .authenticate()
  .then(function () {
    console.log(
      "Connection of wltest app has been established successfully.",
      config
    );
  })
  .catch(function (err) {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
