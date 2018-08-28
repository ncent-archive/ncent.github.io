const Bug = require('../models').Bug;

module.exports = {
  create(req, res) {
    return Bug
      .create({
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
      })
      .then(bug => res.status(201).send(bug))
      .catch(error => res.status(400).send(error));
  },
};