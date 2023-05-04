const jwt = require("jsonwebtoken");

function loggedUserDataMiddleware(req, res, next) {
  if(req.cookies.token) {
    try {
      const user = jwt.verify(req.cookies.token, "batata");
      res.locals.isLogged = true;
      res.locals.nameLogged = user.name;

      return next();
    } catch (error) {
      res.locals.isLogged = false;
    }

  }else res.locals.isLogged = false;

  return next();
}

module.exports = loggedUserDataMiddleware;
