// jshint esversion : 6
//
const User = require("../models/user");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/main');

generateToken = (user) => {
  return jwt.sign(user, config.secret, {
    expiresIn: 2592000000
  });
};

setUserInfo = (request) => {
  return {
    _id: request._id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email
  };
};

index = (req, res) => {
	res.json({message: "Brah Why we no use ES6 when we are compiling our code anyways!"});
};

signup = (req, res) => {
	const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;


  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    let user = new User({
			firstName: firstName,
			lastName: lastName,
      email: email,
      password: password
    });

    user.save((err, user) => {
      if (err) { return next(err); }

      let userInfo = setUserInfo(user);

			// Respond with JWT if user was created
      res.status(201).json({
        token: generateToken(userInfo),
        user: userInfo
      });
    });
  });
};

login = (req, res) => {
	let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: generateToken(userInfo),
    user: userInfo
  });
};


module.exports = {
	index: index,
	signup: signup,
	login: login
};
