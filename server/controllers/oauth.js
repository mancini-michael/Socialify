const passport = require("../config/passport");

module.exports = {
  login: passport.authenticate("google", {
    scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
  }),
  callback: passport.authenticate("google", {
    successRedirect: "/homepage",
    failureRedirect: "/",
  }),
  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
};
