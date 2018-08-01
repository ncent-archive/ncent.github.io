//const Bug = require('../models').bug;
const Program = require('../models').Program;
const Sponsor = require('../models').Sponsor;
module.exports = {
  create(req, res) {
    let data;
    Program
      .create({
        name: req.body.name,
        uuid: req.body.uuid,
        endTime: req.body.endTime,
        status: req.body.status,
        sponsor_uuid: req.params.sponsor_uuid
      })
      .then((program) => res.status(201).send(program))
      // .then(function(program){
      //   data = {prg: program}
      //   Sponsor.findById(req.params.sponsor_uuid, {
      //     include: [{
      //       model: Program,
      //       as: 'programs',
      //       }],
      //     })
      //   })
      // .then(sponsor => {
      //     if (!sponsor) {
      //       return res.status(404).send({
      //         message: 'Sponsor Not Found',
      //       });
      //     }

      //     let pgrm = sponsor.programs;
      //     pgrm.push(data);
      //     return sponsor
      //     .upsert({
      //       programs: pgrm
      //     })
      //     .then(() => res.status(200).send(sponsor))
      //     .catch(error => res.status(400).send(error));
      // })
      .catch(error => res.status(400).send(error));
  }
  // list(req, res) {
  //   return Program
  //     .findAll({
  //       include: [{
  //         model: Bug,
  //         as: 'bugs',
  //       }],
  //     })
  //     .then(program => res.status(200).send(program))
  //     .catch(error => res.status(400).send(error));
  // },
  // retrieve(req, res) {
  //   return Program
  //     .findById(req.params.program_uuid, {
  //       include: [{
  //         model: Bug,
  //         as: 'bugs',
  //       }],
  //     })
  //     .then(program => {
  //       if (!sponsor) {
  //         return res.status(404).send({
  //           message: 'Program Not Found',
  //         });
  //       }
  //       return res.status(200).send(program);
  //     })
  //     .catch(error => res.status(400).send(error));
  // },
  // update(req, res) {
  //   return Program
  //     .findById(req.params.program_uuid, {
  //       include: [{
  //         model: Bug,
  //         as: 'bugs',
  //       }],
  //     })
  //     .then(program => {
  //       if (!program) {
  //         return res.status(404).send({
  //           message: 'Program Not Found',
  //         });
  //       }
  //       return progam
  //         .update({
  //           Bug: req.body.Bug || program.Bug,
  //         })
  //         .then(() => res.status(200).send(program))  
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
   //},
}