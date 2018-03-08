'use strict';

var mongoose = require('mongoose');
var User = require('./users.js');
var Review = require('./reviews.js');

var Schema = mongoose.Schema

var CourseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true },
  description: {
    type: String,
    required: true},
  estimatedTime: String,
  materialsNeeded: String,
  steps: [
    {
      stepNumber: Number,
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

var Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
