const Sponsor = require('../models').Sponsor;
const Program = require('../models').Program;

module.exports = {
  create(req, res) {
    return Sponsor
      .create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website

      })
      .then(sponsor => res.status(201).send(sponsor))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Sponsor
      .findAll({
        // attributes:{
        //   include: [{
        //     model: Program,
        //     as: 'programs',
        //   }],
        // }
      })
      .then(sponsor => res.status(200).send(sponsor))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Sponsor
      .findById(req.params.sponsor_uuid, {
        include: [{
          model: Program,
          as: 'programs',
        }],
      })
      .then(sponsor => {
        if (!sponsor) {
          return res.status(404).send({
            message: 'Sponsor Not Found',
          });
        }
        return res.status(200).send(sponsor);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Sponsor
      .findById(req.params.sponsor_uuid, {
        include: [{
          model: Program,
          as: 'programs',
        }],
      })
      .then(sponsor => {
        if (!sponsor) {
          return res.status(404).send({
            message: 'Sponsor Not Found',
          });
        }
        return sponsor
          .update({
            //programs: req.body.Program || sponsor.Program,
            website: req.body.website || sponsor.website,
            name: req.body.name || sponsor.name,
            email: req.body.email || sponsor.email,
            phone: req.body.phone || sponsor.phone
          })
          .then(() => res.status(200).send(sponsor))  // Send back the updated tokentype.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};