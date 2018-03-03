var session = require('express-session')
var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Book = require('../models/Book.js');

/* create a new book */
router.post('/create', function(req, res, next) {
  // format and validate book options
  var options = req.body['option[]'];
  options = options.filter(function(n){ return n.length != 0 })
  if (options.length < 2) {
    res.render('home', {err: "The book needs to have at least two options"})
    return
  }
  // create a new book
  Book.create(options, req, function(err, book) {
    if (err) return res.status(500).send(err);
    else res.redirect('/home')
  })
})

/* get a single book view */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  Book.findOne({ _id: id }, (err, book) => {
    if (err) res.status(500).send(err)
    else res.render('book', {book: book})
  })
})

/* add a new option to existing book */
router.post('/:id/edit', function(req, res, next) {
  var id = req.params.id
  if (req.body.option.length === 0) {
    res.render('/home', { err: 'You need to specify the book option' });
    return
  }
  Book.findOne({ _id: id }, (err, book) => {
    if (err) res.status(500).send(err)
    else if (book.user_id != req.session.user._id) res.redirect('/')
    else {
      book.options.push(req.body.option)
      book.answers.push(0)
      book.save()
      res.redirect('/home')
    }
  })
})

/* delete en existing book */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  Book.remove({ _id: id }, (err) => {
    if (err) res.status(500).send(err)
    else res.redirect('/home')
  })
})

/* search through existing books */
router.post('/search', function(req, res, next) {
  var name = req.body.text
  Book.find({name: new RegExp('^'+name+'$', "i")}, function(err, books) {
    if (err) res.status(500).send(err)
    else res.render('index', { user: req.session.user, books: books });
  })
})

/* select a book option */
router.get('/:id/option/:option', function(req, res, next) {
  var id = req.params.id
  Book.vote(req, function(err, book) {
    if (err) {
      if (err.status != 401) return res.status(500).send(err)
      else return res.render('book', {book: book, err: err})
    }
    else return res.redirect('/book/'+id)
  })
})

module.exports = router;
