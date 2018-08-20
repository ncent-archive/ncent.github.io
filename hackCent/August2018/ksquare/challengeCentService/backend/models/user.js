// jshint esversion : 6

const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
    type: String,
    unique: true,
		required: true
  },
	password: {
		type: String,
		required: true
	}
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = (pw, hash, cb) => {
  bcrypt.compare(pw, hash, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
