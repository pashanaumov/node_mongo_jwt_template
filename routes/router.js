const Authentication = require("../controllers/authentication");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = app => {
  app.post("/sign_up", Authentication.signUp);
  app.post("/sign_in", requireSignIn, Authentication.signIn);
  app.get("/", requireAuth, (req, res) => {
    res.send({
      success: true
    });
  });
};
