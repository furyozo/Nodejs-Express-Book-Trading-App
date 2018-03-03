var express = require('express');
var router = express.Router();
var session = require('express-session')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.session.user });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

module.exports = router;
