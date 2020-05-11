const passport = require("passport");
const User = require("../models/User");
const { jwtSecretString } = require("../config/keys");
const { ExtractJwt, Strategy } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;

/**
 * Local Strategy
 */

const localStrategyOptions = {
  usernameField: "email"
};

const localLogin = new LocalStrategy(
  localStrategyOptions,
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    });
  }
);

/**
 * JWT Strategy
 */

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: jwtSecretString
};

const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
  const user = await User.findById(payload.sub);
  if (user) {
    done(null, user);
  } else {
    return done(null, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
