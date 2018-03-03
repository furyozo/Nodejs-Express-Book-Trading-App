var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/booktrading-app');

var BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  }
});

/**
 * returns all users polls
 * @param  {Book} user_id id of the user whose polls are to be returned
 * @return {Book} polls return poll objects specified by user_id
 */
BookSchema.statics = {

  // create a new poll
  create: function(options, req, callback) {
    var poll = new this({
      name: req.body.name
    });
    poll.save(err => {
      if (err) callback(err)
      else callback(err, poll)
    });
  }

}


module.exports = mongoose.model('Book', BookSchema);
