var session = require('express-session')
var express = require('express');
var router = express.Router();

var Authenticator = require('../middlewares/Authenticate.js');

var Book = require('../models/Book.js');
var Trade = require('../models/Trade.js');
var User = require('../models/User.js')

/* get user private are */
router.get('/', Authenticator.isAuthenticated, function(req, res, next) {
  Book.getBooksByUser(req.session.user, function(err, books) {
    Trade.find({wants_user: req.session.user._id}, function(err, trades) {
      res.render('home', {user: req.session.user, books: books, trades: trades});
    })
  })
})

module.exports = router;
