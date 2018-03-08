'use strict';

var mongoose = require('mongoose');
var User = require('./users.js');

var Schema = mongoose.Schema

var ReviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postenOn: {
    type: Date,
    default: Date.now()
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
   },
  review: String
});


var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
