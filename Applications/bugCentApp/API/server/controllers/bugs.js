const Bug = require('../models').Bug;
const Developer = require('../models').Developer;
const bugDeveloper = require('../models').bugDevelopers;
const Program = require('../models').Program;

module.exports = {
  create(req, res) {
    return Bug
      .create({
        name: req.body.name,
        status: req.body.status,
        bountyAmount: req.body.bountyAmount,
        program_uuid: req.params.program_uuid
      })
      .then(bug => res.status(201).send(bug))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Bug
      .findAll({
        include: [{
          model: bugDeveloper,
          as: 'devsWorkingOn',
        }],
      })
      .then(bug => res.status(200).send(bug))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Bug
      .findById(req.params.bug_uuid, {
        include: [{
          model: bugDeveloper,
          as: 'devsWorkingOn',
        }],
      })
      .then(bug => {
        if (!bug) {
          return res.status(404).send({
            message: 'Bug Not Found',
          });
        }
        return res.status(200).send(bug);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Bug
      .findById(req.params.bug_uuid, {
        include: [{
          model: bugDeveloper,
          as: 'devsWorkingOn',
        }],
      })
      .then(bug => {
        if (!bug) {
          return res.status(404).send({
            message: 'Bug Not Found',
          });
        }
        return bug
          .update({
           name: req.body.name || bug.name,
           bountyAmount: req.body.bountyAmount || bug.bountyAmount,
           status: req.body.status || bug.status
          })
          .then(() => res.status(200).send(bug))  
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};