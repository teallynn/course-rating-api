'use strict';

var mongoose = require('mongoose');
var User = require('./users.js');
var Review = require('./reviews.js');

var Schema = mongoose.Schema

var CourseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  estimatedTime: String,
  materialsNeeded: String,
  steps: [
    {
      stepNumber: Number,
      title: {
        type: String,
        required: [true, 'Step title is required']
      },
      description: {
        type: String,
        required: [true, 'Step description is required']
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
