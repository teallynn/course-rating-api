'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/course-rating');

var db = mongoose.connection:

var Schema = mongoose.Schema

var UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: {
    type: String,
     required: true
   },
  emailAddress: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    validate: {
         validator: function(v) {
           return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v);
         },
          message: '{VALUE} is not a valid email address!'
        }
       },
    password: {
      type: String,
      required: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = Users;