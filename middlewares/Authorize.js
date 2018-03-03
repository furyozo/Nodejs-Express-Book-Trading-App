var session = require('express-session')

module.exports = class Authorize {

  // check if user is logged in
  static isAuthorizedUser(req, res, next) {
    if (req.session.user._id !== req.params.id) {
      res.redirect('/login');
    } else {
      return next();
    }
  }

}
