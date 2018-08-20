const db = require('../db');
const User = require('../db/models/user');

const router = require('express').Router();

// Login
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      res.status(400).send({ errors: ['Email not found']});
    } else if (!user.validPassword(password)) {
      res.status(400).send({ errors: ['Invalid password']});
    } else {
      req.session.user = user.dataValues;
      res.send(user);
    }
  });
});

// Logout
router.delete('/', (req, res) => {
  const userId = req.body.id;
  if (req.session.user && req.cookies.session_token) {
    res.clearCookie('session_token');
    res.status(200).send('Logged out successfully');
  } else {
    res.status(404).send('No user logged in to log out!');
  }
});
