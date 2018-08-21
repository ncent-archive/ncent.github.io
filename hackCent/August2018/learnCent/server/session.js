const db = require('../db');
const User = require('../db/models/user');

const router = require('express').Router();

// Login
router.post('/', (req, res) => {
  const reqUser = req.body.user;
  const reqEmail = reqUser.email;
  const reqPassword = reqUser.password;

  User.findOne({ where: { email: reqEmail } }).then((user) => {
    if (!user) {
      res.status(400).send({ errors: ['Email not found']});
    } else if (!user.validPassword(reqPassword)) {
      res.status(400).send({ errors: ['Invalid password']});
    } else {
      const { id, email} = user.dataValues;
      const storeUser = {id, email};
      req.session.user = storeUser;
      res.send({user: storeUser});
    }
  });
});

// Logout
router.delete('/', (req, res) => {
  const userId = req.body.userId;
  if (req.session.user && req.cookies.session_token) {
    res.clearCookie('session_token');
    res.status(200).send('Logged out successfully');
  } else {
    res.status(404).send('No user logged in to log out!');
  }
});

module.exports = router;
