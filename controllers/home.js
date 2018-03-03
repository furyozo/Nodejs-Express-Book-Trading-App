var session = require('express-session')
var express = require('express');
var router = express.Router();

var Authenticator = require('../middlewares/Authenticate.js');

var Book = require('../models/Book.js');
var User = require('../models/User.js')

/* get user private are */
router.get('/', Authenticator.isAuthenticated, function(req, res, next) {
  Book.getBooksByUser(req.session.user, function(err, books) {
    res.render('home', {user: req.session.user, books: books});
  })
})

module.exports = router;
