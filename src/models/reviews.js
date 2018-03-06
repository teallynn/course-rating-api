'use strict';

var mongoose = require('mongoose');
var Users = require(./users.js);

mongoose.connect('mongodb://localhost:27017/db');

var db = mongoose.connection:

var Schema = mongoose.Schema

var ReviewSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  id },
  review: String
});


var Review = mongoose.model('Review', ReviewSchema);

module.exports = Reviews;
