const Bug = require('../models').Bug;
const Program = require('../models').Program;
const Sponsor = require('../models').Sponsor;
module.exports = {
  create(req, res) {
    return Program
      .create({
        name: req.body.name,
        endTime: req.body.endTime,
        status: req.body.status,
        sponsor_uuid: req.params.sponsor_uuid
      })
      .then((program) => res.status(201).send(program))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Program
      .findAll({
        include: [{
          model: Bug,
          as: 'bugs',
        }],
      })
      .then(program => res.status(200).send(program))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Program
      .findById(req.params.program_uuid, {
        include: [{
          model: Bug,
          as: 'bugs',
        }],
      })
      .then(program => {
        if (!program) {
          return res.status(404).send({
            message: 'Program Not Found',
          });
        }
        return res.status(200).send(program);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Program
      .findById(req.params.program_uuid, {
        // include: [{
        //   model: Bug,
        //   as: 'bugs',
        // }],
      })
      .then(program => {
        if (!program) {
          return res.status(404).send({
            message: 'Program Not Found',
          });
        }
        return program
          .update({
            name: req.body.name || program.name,
            endTime: req.body.endTime || program.endTime,
            status: req.body.status || program.status,
          })
          .then(() => res.status(200).send(program))  
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
   },
}