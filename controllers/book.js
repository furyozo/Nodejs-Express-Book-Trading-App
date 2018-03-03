var upload = require('express-fileupload');
var express = require('express');
var router = express.Router();

var Authenticator = require('../middlewares/Authenticate.js');

var Book = require('../models/Book.js');

/* create a new book */
router.post('/add', Authenticator.isAuthenticated, function(req, res, next) {
  Book.create(req, function(err, book) {
    if (err) res.render('home', {user: req.session.user, err: err});
    else res.redirect('/home')
  })
})

router.get('/:id/remove', Authenticator.isAuthenticated, function(req, res, next) {
  Book.remove({ _id: req.params.id }, (err) => {
    if (err) res.status(500).send(err)
    else res.redirect('/home')
  })
})

module.exports = router;
