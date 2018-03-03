var upload = require('express-fileupload');
var express = require('express');
var router = express.Router();

var Book = require('../models/Book.js');

/* create a new book */
router.post('/add', function(req, res, next) {
  Book.create(req, function(err, book) {
    if (err) res.render('/home', err);
    else res.redirect('/home')
  })
})

module.exports = router;
