const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

const users = {};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  return done(null, users[id]);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport callback function fired:");
      console.log(profile);

      if (users[profile.id]) {
        done(null, users[profile.id]);
      } else {
        users[profile.id] = profile;
        done("", profile);
      }
    }
  )
);
