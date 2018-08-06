const bugUser = require('../models').bugUser;
const User = require('../models').User;
const Bug = require('../models').Bug;
module.exports = {
  createNew(req, res) {
    return bugUser
      .create({
        bug_uuid: req.params.bug_uuid,
        user_uuid: req.params.user_uuid
      })
      .then(dev => res.status(201).send(dev))
      .catch(error => res.status(400).send(error));
  }
};