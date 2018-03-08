'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Course = require('../models/courses');
var Review = require('../models/reviews');


// GET /api/users 200 - Returns the currently authenticated user
router.get('/users', function(req, res, next) {

});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/users', function(req, res, next) {

});

// GET /api/courses 200 - Returns the Course "_id" and "title" properties
router.get('/courses', function(req, res, next) {
  Course.find({}, 'course_id title')
				.exec(function(err, courses){
					if(err) return next(err);
          res.status(200);
					res.json(courses);
				});
});

// GET /api/courses/:courseId 200 - Returns all Course properties and related user and review documents for the provided course ID
router.get('/courses/:courseId', function(req, res, next) {

});

// POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
router.post('/courses', function(req, res, next) {

});

// PUT /api/courses/:courseId 204 - Updates a course and returns no content
router.put('/courses/:courseId', function(req, res, next) {

});

// POST /api/courses/:courseId/reviews 201 - Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post('/courses/:id/reviews', function(req, res, next) {

});

module.exports = router;
