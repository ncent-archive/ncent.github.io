const Bug = require('../models').Bug;
const Developer = require('../models').Developer;
const bugDeveloper = require('../models').bugDeveloper;

module.exports = {
  create(req, res) {
    return Bug
      .create({
        name: req.body.name,
        bountyAmount: req.body.bountyAmount,
        status: req.body.status,
        program_uuid: req.param.program_uuid,
        //developer_uuid: req.param.developer_uuid
      })
      .then(bug => res.status(201).send(bug))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Bug
      .findAll({
        include: [{
          model: bugDeveloper,
          as: 'developers',
        }],
      })
      .then(bug => res.status(200).send(bug))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Bug
      .findById(req.params.bug_uuid, {
        // include: [{
        //   model: Developer,
        //   through: bugDevelopers,
        //   as: 'developer',
        // }],
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
        // include: [{
        //   model: Developer,
        //   as: 'developers',
        // }],
      })
      .then(bug => {
        if (!bug) {
          return res.status(404).send({
            message: 'Bug Not Found',
          });
        }
        return bug
          .update({
           // Developer: req.body.Developer || program.Developer,
           name: req.body.name || bug.name,
           bountyAmount: req.body.bountyAmount || bug.bountyAmount,
           status: req.body.status || bug.status
           
          })
          .then(() => res.status(200).send(bug))  
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};