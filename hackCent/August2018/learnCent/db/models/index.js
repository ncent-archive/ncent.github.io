'use strict';

const User = require('./user');
const Request = require('./request');
const University = require('./university');

User.hasMany(Request);
Request.belongsTo(User);
// University.hasMany(User);
// User.belongsTo(University);
// TODO Add foreign key to user to store university_id

module.exports = {
  User,
  Request,
  University
};
