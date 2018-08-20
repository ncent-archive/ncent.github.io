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

module.exports = router;
