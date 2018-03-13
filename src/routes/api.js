'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Course = require('../models/courses');
var Review = require('../models/reviews');
var mid = require('../middleware');

router.param('courseId', function(req, res, next, id) {
  Course.findById(req.params.courseId, function(err, doc) {
    if(err) return next(err);
    if(!doc) {
      err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
    req.course = doc;
    return next();
  })
  .populate('user reviews');
});

// GET /api/users 200 - Returns the currently authenticated user
router.get('/users', mid.authenticateUser, function(req, res, next) {
    res.status(200);
    res.json(req.authenticatedUser);
});

// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/users', function(req, res, next) {
  User.findOne({ emailAddress: req.body.emailAddress })
      .exec(function(error, user) {
        if(error) return next(error);
        if(user) {
          var err = new Error('User email address already exists in database.');
          err.status = 401;
          return next(err);
        } else {
          User.create(req.body, function (err, user) {
            if (err) {
              return res.json(err);
            } else {
              res.location('/');
              res.status(201);
              res.end();
            };
          });
        };
    });
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
  res.json(req.course);
});

// POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
router.post('/courses', mid.authenticateUser, function(req, res, next) {
  var course = new Course(req.body);
  course.save(function(err, course) {
    if(err) return res.json(err);
    res.status(201);
    res.location('/courses').json();
  });
});

// PUT /api/courses/:courseId 204 - Updates a course and returns no content
router.put('/courses/:courseId', mid.authenticateUser, function(req, res, next) {
  req.course.update(req.body, function(err, result) {
    if(err) return res.json(err);
    res.status(204).json();
  });
});

// POST /api/courses/:courseId/reviews 201 - Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post('/courses/:courseId/reviews', mid.authenticateUser,   function(req, res, next) {
  req.course.reviews.push(req.body);
  req.course.save(function(err, course) {
    if(err) return res.json(err);
    res.status(201);
    res.location('/:courseId').json();
  });
});

module.exports = router;
