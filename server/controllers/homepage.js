module.exports = {
  renderPage: (req, res) => {
    res.render("homepage", { title: "Homepage" });
  },
};
