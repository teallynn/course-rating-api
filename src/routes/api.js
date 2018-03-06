'use strict';

var express = require('express');



GET /api/users 200 - Returns the currently authenticated user
POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

GET /api/courses 200 - Returns the Course "_id" and "title" properties
GET /api/courses/:courseId 200 - Returns all Course properties and related user and review documents for the provided course ID
POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
PUT /api/courses/:courseId 204 - Updates a course and returns no content
