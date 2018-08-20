'use strict';

const User = require('./user');
const Request = require('./request');

User.hasMany(Request);
Request.belongsTo(User);

module.exports = {
  User,
  Request
};
