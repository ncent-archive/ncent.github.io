const { generatePasswordDigest } = require('./utils/user_utils');

const db = require('../db');
const User = require('../db/models/user');
const Request = require('../db/models/request');

const router = require('express').Router();

router.get('/', function(req, res, next) {
    User.findAll({
            include: [Request]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    User.findOne({
            where:{id: req.params.id},
            include: [Request]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

// Signup
router.post('/', function(req, res) {
  const reqUser = req.body.user;
  const reqEmail = reqUser.email;
  const reqPassword = reqUser.password;
  User.create({
    email: reqEmail,
    password_digest: generatePasswordDigest(reqPassword),
  })
  .then(user => {
    const { id, email} = user.dataValues;
    const storeUser = {id, email};
    req.session.user = storeUser;
    res.send({user: storeUser});
  })
  .catch(error => {
    res.status(422).send({ errors: [error]});
  });
});

module.exports = router;
