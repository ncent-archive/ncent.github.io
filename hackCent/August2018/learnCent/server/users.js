const db = require('../db');
const User = require('../db/models/user');
const Request = require('../db/models/request');
const { getUserTokenBalance, transferTokens } = require('./utils/sdk_utils');

const router = require('express').Router();



// router.get('/', function(req, res, next) {
//     User.findAll({
//             include: [Request]
//         })
//         .then(users => {
//             res.status(200).send({ users });
//         })
//         .catch(next);
// });
//
// router.get('/:id', function(req, res, next) {
//     User.findOne({
//             where:{id: req.params.id},
//             include: [Request]
//         })
//         .then(user => {
//             res.status(200).send({ user });
//         })
//         .catch(next);
// });

// Signup
router.post('/', function(req, res) {
  const reqUser = req.body.user;
  const reqEmail = reqUser.email;
  const reqPassword = reqUser.password;

  User.create({
    email: reqEmail,
    password_digest: reqPassword,
  })
  .then(user => {
    const { id, email, university_id, public_key, private_key } = user.dataValues;
    const resUser = {id, email};
    const sessionUser = {
      id,
      email,
      universityId: university_id,
      publicKey: public_key,
      privateKey: private_key
    };
    req.session.user = sessionUser;
    res.send({user: resUser});
  })
  .catch(error => {
    res.status(422).send({ errors: [error]});
  });
});

// Get Token Count of currentUser
router.get('/tokens', function(req, res) {
  // getUserTokenBalance
  res.send({tokenCount: 10});
});


module.exports = router;
