// jshint esversion : 6
// 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/app");

module.exports.User = require("./user.js");
