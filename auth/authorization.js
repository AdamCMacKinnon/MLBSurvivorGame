function authorization(req, res, next) {
  if (req.session) {
    if (req.session.id) {
      res.locals.authenticated = true;
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
}

module.exports = authorization;
