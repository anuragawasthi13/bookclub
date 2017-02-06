'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  time: {
  	type: Date,
  	default: Date.now()
  },

  requestor: String,

  requested: String,

  granted: {
  	type: Boolean,
  	default: false
  },

  book: {
  	title: String,
  	bookId: String
  }
});

module.exports = mongoose.model('BCRequest', RequestSchema);