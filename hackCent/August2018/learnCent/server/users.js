import { generatePasswordDigest } from './utils/user_utils';

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
            where:{id:req.params.id},
            include: [Request]
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
});

// Signup
router.post('/', function(req, res) {
  User.create({
    email: req.body.email,
    password_digest: generatePasswordDigest(req.body.password),
  })
  .then(user => {
    req.session.user = user.dataValues;
    res.send(user);
  })
  .catch(error => {
    res.status(422).send({ errors: [error]});
  });
});

module.exports = router;
