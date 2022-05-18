module.exports = {
  renderPage: (req, res) => {
    res.render("homepage", {
      title: "Homepage",
      auth: req.isAuthenticated(),
      user: req.session.passport.user,
    });
  },
};
