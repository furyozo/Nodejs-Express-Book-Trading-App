var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId;
var path = require('path')

mongoose.connect('mongodb://localhost/tradetrading-app');

var Book = require('./Book.js')

var TradeSchema = new mongoose.Schema({
  offering_id: {
    type: ObjectId,
    required: true
  },
  wants_id: {
    type: ObjectId,
    required: true
  },
  offering_user: {
    type: ObjectId,
    required: true
  },
  wants_user: {
    type: ObjectId,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true
  }
});

TradeSchema.statics = {

  // create a new trade entry
  create: function(req, callback) {

    var offering_id = req.params.offering_id;
    var wants_id = req.params.wants_id;
    var offering_user;
    var wants_user;
    var Trade = this;

    Book.findById(offering_id, function(err, book) {
      offering_user = book.user_id;
      Book.findById(wants_id, function(err, book) {
        wants_user = book.user_id;
        // save the new trade object
        var trade = new Trade({
          offering_id: offering_id,
          wants_id: wants_id,
          offering_user: offering_user,
          wants_user: wants_user,
          accepted: false
        });
        trade.save(err => {
          if (err) callback(err)
          else callback(null, trade)
        })
      })
    })
  },

}


module.exports = mongoose.model('Trade', TradeSchema);
