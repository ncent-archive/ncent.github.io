const api = module.exports = require('express').Router();
const users = require('./users');
const session = require('./session');

api.use('/users', users);
api.use('/session', session);

api.use((req, res) => res.status(404).end());
