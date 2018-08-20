const api = module.exports = require('express').Router();
const users = require('./users');

// api.get('/express-test', (req, res) => res.send({express: 'working!'}))
//   .use('/users', users);
//   .use('/requests', requests)

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
